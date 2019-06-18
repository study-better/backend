const express = require('express')
const asyncExpress = require('async-express')
const mongoose = require('mongoose')
const app = express()

mongoose.set('useCreateIndex', true)
require('./models/assignment')
require('./models/class')
require('./models/user')
require('./models/card')
require('./models/chapter')

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

/**
 * Establish a connection to the mongo database, then continue the request
 **/
app.use(mongoConnect)

require('./routes/assignment')(app)
require('./routes/class')(app)
require('./routes/user')(app)
require('./routes/card')(app)
require('./routes/chapter')(app)

module.exports = app
