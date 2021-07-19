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

function index(req, res){
    try {
        fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false')
        .then(response => response.json())
        .then(data => {
            res.render('coins/index', { coins: data, title: 'Coin Index', user: req.user ? req.user : null })
        })
    } catch (Error) {
        console.log(Error)
        res.json(Error)
    }
}

function trending(req, res){
    try {
        fetch('https://api.coingecko.com/api/v3/search/trending')
        .then(response => response.json())
        .then(data => {
            res.render('coins/trending', { coins: data.coins, title: 'Trending', user: req.user ? req.user : null })
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
            res.render('coins/show', {coin: data, profile: profile[0], title: req.params.id})
        })
    } catch (Error) {
        console.log(Error)
        res.json(Error)
    }
}

async function create(req,res){
    try {
        const profile = await Profile.find({ _id: req.user.profile._id})
        const watchlist = await profile[0].watchlists.id(req.body.watchlistId)
        fetch(`https://api.coingecko.com/api/v3/coins/${req.params.id}?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false`)
        .then(response => response.json())
        .then(async data => {
            await Coin.findOne({ id: data.id }, (err, found) => {
            if (err) { console.log (err) }
            if (!found) {
                let coin = new Coin({
                    id: data.id,
                    symbol: data.symbol,
                    name: data.name,
                    image: data.image.large,
                })
                coin.save(err => {
                    if (err) { console.log (err) }
                })
                watchlist.coins.push(coin._id)
                profile[0].save(err => {
                res.redirect(`/api/coins/${req.params.id}/show`)
                })
            } else {
                console.log(`${req.params.id} exists in DB - skipping add`)
                Coin.findOne({ id: req.params.id })
                .then(coin => {
                    watchlist.coins.addToSet(coin)
                })
                .then(() => profile[0].save(err => {
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
            console.log(data.id, 'fired')
            res.render('coins/show', {coin: data, profile: profile[0], title: req.body.query})
        }
    } catch (Error) {
        console.log(Error)
        res.redirect('/')
    }
}


