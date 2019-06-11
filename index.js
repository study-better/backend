const express = require('express')
const asyncExpress = require('async-express')
const mongoose = require('mongoose')
const app = express()

app.use(express.json())

app.use((_, res, next) => {
  res.set('Access-Control-Allow-Origin', '*')
  res.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT')
  res.set('Access-Control-Allow-Headers', 'content-type')
  next()
})

const mongoConnect = asyncExpress(async (_1, _2, next) => {
  await mongoose.connect(process.env.DB_URI, {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
  })
  next()
})

const mongoDisconnect = asyncExpress(async (_1, _2, next) => {
  await mongoose.disconnect()
  next()
})

/**
 * Establish a connection to the mongo database, then continue the request
 **/
app.use(mongoConnect)

app.get('/', (req, res) => res.send('hello'))

module.exports = app
