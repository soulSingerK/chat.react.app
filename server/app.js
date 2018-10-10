const express = require('express')
const mongoose = require('mongoose')
const userRouter = require('./user') 

const app = express()

app.use('/user', userRouter)
// 连接mongod
// const DB_URL = 'mongodb://127.0.0.1:27017/shisan'
// mongoose.connect(DB_URL, {
//   useNewUrlParser: true
// })
// mongoose.connection.on('connected', () => {
//   console.log('mongodb 连接成功')
// })

app.listen(1313, () => {
  console.log(`run on the port 1313`)
})