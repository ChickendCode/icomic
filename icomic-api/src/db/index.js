const mongoose = require('mongoose')

const connect = async () => {
  try {
    // await mongoose.connect('mongodb://127.0.0.1:27017/manga_dev', {
    await mongoose.connect('mongodb+srv://icomic:rN9EvBqEjVoCY94N@cluster0.ne9rh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
    console.log('connect db successfully!')
  } catch(error) {
    console.log(error)
    console.log('connect db failed!')
  }
}

module.exports = { connect }