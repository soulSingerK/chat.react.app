const express = require('express')
const userRouter = require('./user') 

const app = express()

app.use('/user', userRouter)

app.listen(1313, () => {
  console.log(`run on the port 1313`)
})