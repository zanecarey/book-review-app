const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({})
    .populate('reviews', { url: 1, author: 1, bookTitle: 1, likes: 1, dislikes: 1, reviewTitle: 1, book_id: 1, created_on: 1})

  response.json(users)
})

usersRouter.get('/:id', async (request, response, next) => {
  const user = await User
      .findById(request.params.id)
      .populate('reviews', { author: 1, bookTitle: 1, likes: 1, dislikes: 1, reviewTitle: 1, book_id: 1, created_on: 1})
      .populate('comments', { comment: 1, review_id: 1, likes: 1, dislike: 1, created_on: 1 })

  if (user) {
      response.json(user)
  } else {
      response.status(404).end()
  }
})
usersRouter.post('/', async (request, response) => {
    const { username, password } = request.body
  
    if(password === undefined || password.length < 3) {
      return response.status(400).json({error: 'password required and must have length > 3 characters'})
    }
  
    const existingUser = await User.findOne({ username })
    if (existingUser) {
      return response.status(400).json({
        error: 'username must be unique'
      })
    }
    
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
  
    const user = new User({
      username,
      passwordHash,
      created_on: new Date()
    })
  
    const savedUser = await user.save()
  
    response.status(201).json(savedUser)
  })
  
  module.exports = usersRouter