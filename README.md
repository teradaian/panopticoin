<img src="public/assets/title-logo.png" width=100% height=auto alt="panopticoin banner">

PanoptiCoin is a MEN stack Cryptocurrency tracker built on the CoinGecko API. 

## About

Keeping up to date on a volatile market like Cryptocurrency can feel like a full time job. PanoptiCoin helps you keep an eye on all of your favorite coins with watchlists, an easy way to group crypto projects. It also offers an easy way to view what other users are following and engage with their watchlists. Search the popular and well-established coins from the main page, or search by CoinGecko id for newer or more obscure coins. You can also check out what is currently hot in the crypto sphere via the trending button.

## Getting Started

The app is deployed on heroku [here](https://panopticoin.herokuapp.com/api/coins)

## Languages
<img src="public/assets/readme/languagesbg.png" width=100% height=auto alt="wireframe">
* HTML * CSS * JavaScript

## Built With

* [CoinGeckoAPI](https://www.coingecko.com/en/api)
* [Mongoose](https://mongoosejs.com/)
* [Express](https://expressjs.com/)
* [Milligram](https://milligram.io/)
* [Font Awesome](https://fontawesome.com/)

## Authors

**Ian Terada** 

## Next Steps

* Robust search by name/symbol
* Quick add coins from index
* Light mode

## Wireframe

<img src="public/assets/readme/wireframe.png" width=100% height=auto alt="wireframe">

## ERD

<img src="public/assets/readme/ERD.png" width=100% height=auto alt="erd">

## Pseudocode and User Stories

The main focus of this project was API + MEN stack integration; a RESTful, full CRUD application that allows users to connect with the powerful CoinGecko API and get up to date stats on the market as well as individual coins. Users expect full crud functionality for their watchlists, and easy coin adding across various watchlists. 

Of primary importance to this project was limiting needless API requests. As coins are viewed individually they return up-to-date market data, but as they are saved to a watchlist the controller will filter out new coins and save static data to the database, eliminating calls during watchlist views or any editing for images or name information, etc. These lightweight, static coins can then be referenced from the watchlist to return data from the API on request. 

<img src="public/assets/logo.png" width=100% height=auto alt="panopticoin banner">