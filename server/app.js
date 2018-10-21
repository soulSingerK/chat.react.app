const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const userRouter = require('./user')
const models = require('./model')

const Chat = models.getModel('chat')
const app = express()

const server = require('http').Server(app)
const io = require('socket.io')(server)
io.on('connection', (socket) => {
  console.log('be connect')
  socket.on('sendmsg', (data) => {
    Chat.create(data, (err, doc) => {
      if (err) {
        // return res.json({ code: 1, msg: '后端出错了' })
        return console.log('error')
      }
      io.emit('recivemsg', doc)
    })
  })
})

app.use(cookieParser())
app.use(bodyParser.json())

app.use('/user', userRouter)

server.listen(1313, () => {
  console.log(`run on the port 1313`)
})