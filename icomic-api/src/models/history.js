const mongoose = require('mongoose')
const Schema = mongoose.Schema

const History = new Schema({
  userId: { type: String, maxLength: 30 },
  storyId: { type: String, maxLength: 30 },
  chapterId: { type: String, maxLength: 30 },
})

module.exports = mongoose.model('history', History)