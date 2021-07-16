import mongoose from 'mongoose'

export {
    Coin
}

const coinSchema = new mongoose.Schema({
    id: {type: String, unique: true}
  })
  
  const Coin = mongoose.model("Coin", coinSchema)