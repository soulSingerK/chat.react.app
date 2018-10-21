const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser') 
const userRouter = require('./user')
const app = express()

const server = require('http').Server(app)
const io = require('socket.io')(server)
io.on('connection', () => {
  console.log('be connect')
})

app.use(cookieParser())
app.use(bodyParser.json())

app.use('/user', userRouter)

server.listen(1313, () => {
  console.log(`run on the port 1313`)
})