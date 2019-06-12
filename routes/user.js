const mongoose = require('mongoose')
const asyncExpress = require('async-express')
const auth = require('../middleware/auth')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = mongoose.model('User')

module.exports = (app) => {
  app.post('/users', createUser)
}

const createUser = asyncExpress(async (req, res) => {
  if (!req.body.password || req.body.password.length < 6) {
    res.status(400).json({
      message: 'Please make sure your password is more than 6 characters'
    })
    return
  }
  const existingUsername = await User.findOne({
    username: {
      $regex: new RegExp(`^${req.body.username}$`, 'i'),
    },
  }).exec()
  if (existingUsername) {
    res.status(400).json({
      message: 'Username is already taken',
    })
    return
  }
  const salt = await bcrypt.genSalt(10)
  const passwordHash = await bcrypt.hash(req.body.password, salt)
  const { _doc } = await User.create({
    ...req.body,
    passwordHash,
    createdAt: new Date(),
  })
  const token = jwt.sign({
    ..._doc,
    passwordHash: '',
  }, process.env.WEB_TOKEN_SECRET)
  const user = await User.create({
    ...req.body,
    passwordHash,
    createdAt: new Date(),
  })
  res.json({ ...user._doc, token })
})
