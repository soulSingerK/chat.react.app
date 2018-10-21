const models = require('./model')
const express = require('express')
const util = require('utility')

const Router = express.Router()
const User = models.getModel('user')
const Chat = models.getModel('chat')
const filter = { pwd: 0, __v: 0 }

Router.get('/list', (req, res) => {
  // User.remove({}, () => {})
  // Chat.remove({}, () => {})
  const { type } = req.query
  User.find({type}, filter, (err, doc) => {
    res.json({ code: 0, data: doc })
  })
})

Router.get('/getmsglist', (req, res) => {
  // const user = req.cookies
  User.find({}, (err, doc) => {
    if (err) {
      res.json({ code: 1, msg: '出错' })
    }
    const users = {}
    doc.forEach(item => {
      users[item._id] = { user: item.user, avatar: item.avatar }
    })
    Chat.find({}, (err, doc) => {
      if (!err) {
        res.json({ code: 0, msgs: doc, users: users })
      }
    })
  })
})

Router.post('/update', (req, res) => {
  const userid = req.cookies.userid
  if (!userid) {
    return res.json({ code: 1 })
  }
  const body = req.body
  User.findOneAndUpdate({ _id: userid }, body, (err, doc) => {
    if (err) return res.json({ code: 1, msg: '后端出错' })
    const data = Object.assign({}, { user: doc.user, type: doc.type }, req.body)
    return res.json({ code: 0, data })
  })
})

Router.post('/login', (req, res) => {
  const { user, pwd } = req.body
  User.findOne({ user, pwd: md5Pwd(pwd) }, filter, (err, doc) => {
    if (!doc) {
      return res.json({ code: 1, msg: '用户不存在或者密码错误' })
    }
    res.cookie('userid', doc._id)
    return res.json({ code: 0, data: doc })
  })
})

Router.post('/register', (req, res) => {
  const { user, pwd, type } = req.body
  User.findOne({user: user}, (err, doc) => {
    if (doc) {
      return res.json({ code: 1, msg: '用户已存在' })
    }
    const userModel = new User({ user, type, pwd: md5Pwd(pwd) })
    userModel.save((err, doc) => {
      if (err) {
        return res.json({ code: 1, msg: '后端出错了' })
      }
      const { user, _id, type } = doc
      res.cookie('userid', _id)
      return res.json({ code: 0, data:  { user, _id, type }})
    })
  })
})

Router.get('/info', (req, res) => {
  const userid = req.cookies.userid
  if (userid) {
    User.findOne({ _id: userid }, filter, (err, doc) => {
      if (err) {
        return res.json({ code: 1, msg: '后端出错了' })
      }
      if (doc) {
        return res.json({ code: 0, data: doc })
      }
    })
  } else {
    return res.json({code: 1})
  }
})

function md5Pwd (pwd) {
  const salt = 'shisan_node_react_1313740'
  const firstMd5Str = util.md5(`${pwd}${salt}`)
  return util.md5(firstMd5Str)
}

module.exports = Router
