const express = require('express')
const asyncExpress = require('async-express')
const mongoose = require('mongoose')
const nanoid = require('nanoid')
const _ = require('lodash')
const moment = require('moment')
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

const classes = [
  {
    _id: '1',
    name: 'AP US History',
    totalAssignments: 43,
    completedAssignments: 24,
  },
  {
    _id: '2',
    name: 'AP Biology',
    totalAssignments: 24,
    completedAssignments: 10,
  }
]
app.get('/classes', (req, res) => res.json(classes))

const generateAssignment = (classId) => ({
  _id: nanoid(),
  name: `This is an assignment ${nanoid()}`,
  dueDate: moment().add(_.random(-30, 30)),
  classId,
  class: _.map(classes, '_id')[classId],
})

/**
 * Pass query param of "classId"
 **/
app.get('/assignments', (req, res) => res.json([...new Array(20)].map(() => generateAssignment(req.query.classId))))

module.exports = app
