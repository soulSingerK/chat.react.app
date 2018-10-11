const models = require('./model')
const express = require('express')

const Router = express.Router()
const User = models.getModel('user')

Router.get('/list', (req, res) => {
  User.find({}, (err, doc) => {
    res.json(doc)
  })
})

Router.post('/register', (req, res) => {
  console.log(req.body)
  const { user, pwd, type } = req.body
  console.log(user, pwd, type)
  User.findOne({user: user}, (err, doc) => {
    if (doc) {
      return res.json({ code: 1, msg: '用户已存在' })
    }
    User.create({ user, type, pwd }, (err, doc) => {
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

module.exports = Router
