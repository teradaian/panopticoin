import { Coin } from '../models/coin.js'
import { Profile } from '../models/profile.js'
import fetch from "node-fetch";

export {
    index,
    showCoin as show,
    create,
    searchCoins as search,
    trending
}

const API = 'https://api.coingecko.com/api/v3/coins/'

async function index(req, res){
    try {
        const response = await fetch(`${API}markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false`)
        const coins = await response.json()
        res.render('coins/index', { coins, title: 'Coin Index', })
    } catch (Error) {
        console.log(Error)
        res.json(Error)
    }
}

async function trending(req, res){
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/search/trending')
        const { coins } = await response.json()
        res.render('coins/trending', { coins, title: 'Trending', })
    } catch (Error) {
        console.log(Error)
        res.json(Error)
    }
}

async function showCoin(req, res){
    try{
        const profile = await Profile.findById(req.user.profile)
        const response = await fetch(`${API}${req.params.id}?market_data=true`)
        const coin = await response.json()
        res.render('coins/show', { coin, profile, title: req.params.id })
    } catch (Error) {
        console.log(Error)
        res.json(Error)
    }
}

async function create(req,res){
    try {
        const profile = await Profile.findById(req.user.profile._id)
        const watchlist = await profile.watchlists.id(req.body.watchlistId)
        const response = await fetch(`${API}${req.params.id}?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false`)
        const {id, symbol, name, image: {large}} = await response.json()

        const found = await Coin.findOne({ id })
        if (!found) {
            let coin = await Coin.create({ id, symbol, name, image: large })
            watchlist.coins.push(coin._id)
        } else {
            const found = await Coin.findOne({ id: req.params.id })
            watchlist.coins.addToSet(found)
        }
        profile.save()
    } catch (Error) {
        console.log(Error)
    } finally {
        res.redirect(`/coins/${req.params.id}/show`)
    }
}

async function searchCoins(req,res){
    try {
        const profile = await Profile.findById(req.user.profile)
        const query = req.body.query.toLowerCase()
        const result = await fetch(`${API}${query}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`)
        const coin = await result.json()
        if (coin.id === undefined) { 
            throw new Error(`${query} is not a valid ID`)
        } else {
            res.render('coins/show', {coin, profile, title: req.body.query})
        }
    } catch (Error) {
        console.log(Error)
        res.redirect('/')
    }
}


