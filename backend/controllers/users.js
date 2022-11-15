const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({})
    .populate('reviews', { url: 1, author: 1, title: 1, likes: 1 })

  response.json(users)
})

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body
  
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
      name,
      passwordHash,
    })
  
    const savedUser = await user.save()
  
    response.status(201).json(savedUser)
  })
  
  module.exports = usersRouter