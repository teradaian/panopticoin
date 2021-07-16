import mongoose from 'mongoose'
const Schema = mongoose.Schema
export {
  Profile
}

const commentSchema = new Schema({
  name: String,
  comment: String,
})

const watchlistSchema = new Schema({
  name: String,
  description: String,
  coins: [{type: Schema.Types.ObjectId, 'ref':'Coin'}],
  comments: [commentSchema],
})

const profileSchema = new Schema({
  name: String,
  avatar: String,
  watchlists: [watchlistSchema],
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)