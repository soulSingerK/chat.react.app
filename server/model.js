const mongoose = require('mongoose')
// 连接mongod
const DB_URL = 'mongodb://127.0.0.1:27017/shisan'
mongoose.connect(DB_URL, {
  useNewUrlParser: true
})
mongoose.connection.on('connected', () => {
  console.log('mongodb 连接成功')
})

const models = {
  user: {
    user: { type: String, require: true },
    pwd: { type: String, require: true },
    type: { type: String, require: true },
    avatar: { type: String },
    desc: { type: String },
    title: { type: String },
    company: { type: String },
    money: { type: String }
  },
  chat: {}
}

for (let m in models) {
  let Schema = new mongoose.Schema(models[m])
  mongoose.model(m, Schema)
}

module.exports = {
  getModel(name) {
    return mongoose.model(name)
  }
}