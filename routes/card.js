const mongoose = require('mongoose')
const asyncExpress = require('async-express')
const Card = mongoose.model('Card')
const auth = require('../middleware/auth')

module.exports = (app) => {
  app.get('/cards', auth, loadCards)
  app.post('/cards', auth, createCard)
  app.delete('/cards', auth, deleteCard)
}

const loadCards = asyncExpress(async (req, res) => {
  const cards = await Card.find({}).exec()
  res.json(cards)
})

const createCard = asyncExpress(async (req, res) => {
  const card = await Card.create(req.body)
  res.json(card._doc)
})

const deleteCard = asyncExpress(async (req, res) => {
  const _card = await Card.findOne({
    _id: mongoose.Types.ObjectId(req.body._id),
  })
    .lean()
    .exec()
  if (!_card) {
    res.status(404).json({
      message: 'Could not find card to delete',
    })
    return
  }

  await Promise.all([
    Card.deleteOne({_id: mongoose.Types.ObjectId(req.body._id)}).exec(),
  ])
  res.status(204).end()
})
