const models = require('./model')
const express = require('express')

const Router = express.Router()
const User = models.getModel('user')

Router.get('/list', (req, res) => {
  User.find({}, (err, doc) => {
    res.json(doc)
  })
})

Router.get('/info', (req, res) => {
  return res.json({code: 1})
})

module.exports = Router
