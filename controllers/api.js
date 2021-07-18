import { Coin } from '../models/coin.js'
import { Profile } from '../models/profile.js'
import fetch from "node-fetch";

export {
    index,
    showCoin as show,
    create
}

function index(req, res){
    try {
        fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false')
        .then(response => response.json())
        .then(data => {
            res.render('coins/index', { coins: data, title: 'Coin Index' })
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
        let profile = await Profile.find({ _id: req.user.profile._id})
        console.log(req.body, 'req.body')
        // let watchlist = await Profile.find({ _id: req.body._id })
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
                
            } else {
               console.log(`${req.params.id} exists in DB - skipping`)
            }
        })
        res.redirect(`/api/coins/${req.params.id}/show`) 
    })} catch (Error) {
        console.log(Error)
        res.redirect(`/api/coins/${req.params.id}/show`)
}}