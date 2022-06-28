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

async function index(req, res){
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false')
        const data = await response.json()
        res.render('coins/index', { 
                coins: data, 
                title: 'Coin Index', 
                user: req.user ? req.user : null
        })
    } catch (Error) {
        console.log(Error)
        res.json(Error)
    }
}

async function trending(req, res){
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/search/trending')
        const data = await response.json()
        res.render('coins/trending', { 
            coins: data, 
            title: 'Trending', 
            user: req.user ? req.user : null 
        })
    } catch (Error) {
        console.log(Error)
        res.json(Error)
    }
}

async function showCoin(req, res){
    try{
        const profile = await Profile.find({ _id: req.user.profile._id})
        fetch(`https://api.coingecko.com/api/v3/coins/${req.params.id}?market_data=true`)
        .then(response => response.json())
        .then(data => {
            res.render('coins/show', {
                coin: data, 
                profile: profile[0], 
                title: req.params.id})
        })
    } catch (Error) {
        console.log(Error)
        res.json(Error)
    }
}

async function create(req,res){
    try {
        const profile = await Profile.findById(req.user.profile._id)
        const watchlist = await profile.watchlists.id(req.body.watchlistId)
        fetch(`https://api.coingecko.com/api/v3/coins/${req.params.id}?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false`)
        .then(response => response.json())
        .then(async ({ id, symbol, name, large }) => {
            await Coin.findOne({ id }, (err, found) => {
            if (err) { console.log (err) }
            if (!found) {
                let coin = new Coin({ id,symbol,name,image })
                coin.save()
                watchlist.coins.push(coin._id)
                profile.save(err => {
                    res.redirect(`/api/coins/${req.params.id}/show`)
                })
            } else {
                Coin.findOne({ id: req.params.id })
                .then(coin => {
                    watchlist.coins.addToSet(coin)
                })
                .then(() => profile.save(err => {
                    res.redirect(`/api/coins/${req.params.id}/show`)
                    }))
            }})
        })
    } catch (Error) {
    console.log(Error)
    res.redirect(`/api/coins/${req.params.id}/show`)
    }
}

async function searchCoins(req,res){
    try {
        const profile = await Profile.find({ _id: req.user.profile._id})
        const query = req.body.query.toLowerCase()
        const result = await fetch(`https://api.coingecko.com/api/v3/coins/${query}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false
        `)
        const data = await result.json()
        if (data.id === undefined) { 
            console.log(`${query} not found`)
            res.redirect('/')
        } else {
            res.render('coins/show', {coin: data, profile: profile[0], title: req.body.query})
        }
    } catch (Error) {
        console.log(Error)
        res.redirect('/')
    }
}


