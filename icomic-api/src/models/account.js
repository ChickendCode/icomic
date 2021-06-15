const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Account = new Schema({
  username: { type: String, maxLength: 69 },
  password: { type: String, maxLength: 30 },
  fullName: { type: String, maxLength: 128 },
  following: [{ story: { type: Schema.Types.ObjectId, ref: 'story' } }] || [],
  email: { type: String, maxLength: 100 },
  role: { type: String, default: 'user' },
  image: { type: String, default: '' },
  phone: { type: String, maxLength: 20 }
})

module.exports = mongoose.model('account', Account)