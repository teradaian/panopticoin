import mongoose from 'mongoose'

export {
    Coin
}

const coinSchema = new mongoose.Schema({
    name: {type: String, unique: true}
  })
  
  const Coin= mongoose.model("Coin", coinSchema)