import { Coin } from '../models/coin.js'
import fetch from "node-fetch";

export {
    index
}

function index(req, res){
    try {
        fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=25&page=1&sparkline=false')
        .then(response => response.json())
        .then(data => {
            res.render('coins/index', { data, title: 'index' })
        })
    } catch (err) {
        console.log(err)
        res.json(err)
    }
}