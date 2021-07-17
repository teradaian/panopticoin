import mongoose from 'mongoose'
const Schema = mongoose.Schema
export {
  Profile
}

const commentSchema = new Schema({
  author: String,
  comment: String,
}, {
  timestamps: true
})

const watchlistSchema = new Schema({
  title: {type: String, unique: true},
  description: String,
  coins: [{type: Schema.Types.ObjectId, 'ref':'Coin'}],
  comments: [commentSchema],
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