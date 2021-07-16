import { Coin } from '../models/coin.js'
import fetch from "node-fetch";

export {
    index,
    showCoin as show
}

function index(req, res){
    try {
        fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false')
        .then(response => response.json())
        .then(data => {
            res.render('coins/index', { coins: data, title: 'Coin Index' })
        })
    } catch (err) {
        console.log(err)
        res.json(err)
    }
}

function showCoin(req, res){
    try{
        fetch(`https://api.coingecko.com/api/v3/coins/${req.params.id}?market_data=true`)
        .then(response => response.json())
        .then(data => {
            res.render('coins/show', {coin: data, title: req.params.id})
        })
    } catch (err) {
        console.log(err)
        res.json(err)
    }
}