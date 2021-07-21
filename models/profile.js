import mongoose from 'mongoose'
const Schema = mongoose.Schema

export {
  Profile
}

const commentSchema = new Schema({
  author: String,
  text: String
}, {
  timestamps: true
})

const watchlistSchema = new Schema({
  watchlistTitle: String,
  description: String,
  comments: [commentSchema],
  coins: [{type: Schema.Types.ObjectId, 'ref': 'Coin'}],
}, {
  timestamps: true
})

const profileSchema = new Schema({
  name: String,
  avatar: String,
  watchlists: [watchlistSchema],
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)