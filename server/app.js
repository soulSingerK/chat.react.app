const express = require('express')
const mongoose = require('mongoose')

// 连接mongod
const DB_URL = 'mongodb://127.0.0.1:27017/shisan'
mongoose.connect(DB_URL, {
  useNewUrlParser: true
})
mongoose.connection.on('connected', () => {
  console.log('mongodb 连接成功')
})

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  age: {
    type: Number,
    require: true
  }
})
const User = mongoose.model('user', UserSchema)
// 新建一条文档
// User.create({
//   name: 'shisan',
//   age: 18
// }, (err, doc) => {
//   if (err) {
//     return console.log(err)
//   }
//   console.log(doc)
// })


const app = express()

app.get('/', (req, res) => {
  User.find({}, (err, doc) => {
    res.json(doc)
  })
})

app.listen(3036, () => {
  console.log(`run on the port 3036`)
})