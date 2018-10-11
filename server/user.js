const models = require('./model')
const express = require('express')
const util = require('utility')

const Router = express.Router()
const User = models.getModel('user')

Router.get('/list', (req, res) => {
  // User.remove({}, () => {})
  User.find({}, (err, doc) => {
    res.json(doc)
  })
})

Router.post('/login', (req, res) => {
  const { user, pwd } = req.body
  User.findOne({ user, pwd: md5Pwd(pwd) }, (err, doc) => {
    if (!doc) {
      return res.json({ code: 1, msg: '用户不存在或者密码错误' })
    }
    return res.json({ code: 0, data: doc })
  })
})

Router.post('/register', (req, res) => {
  const { user, pwd, type } = req.body
  User.findOne({user: user}, (err, doc) => {
    if (doc) {
      return res.json({ code: 1, msg: '用户已存在' })
    }
    User.create({ user, type, pwd: md5Pwd(pwd) }, (err, doc) => {
      if (err) {
        return res.json({ code: 1, msg: '后端出错' })
      }
      return res.json({ code: 0 })
    })
  })
})

Router.get('/info', (req, res) => {
  return res.json({code: 1})
})

function md5Pwd (pwd) {
  const salt = 'shisan_node_react_1313740'
  const firstMd5Str = util.md5(`${pwd}${salt}`)
  return util.md5(firstMd5Str)
}

module.exports = Router
