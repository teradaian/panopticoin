import mongoose from 'mongoose'

export {
    Coin
}

const coinSchema = new mongoose.Schema({
    id: {type: String, unique: true},
    symbol: String,
    name: String,
    image: String
  })
  
  const Coin = mongoose.model("Coin", coinSchema)