const reviewsRouter = require('express').Router()
const config = require('../utils/config')
const Review = require('../models/review')
const User = require('../models/user')
//const jwt = require('jsonwebtoken')
const { default: mongoose } = require('mongoose')


//GET TOKEN FROM FUNCTION
//TODO

reviewsRouter.get('/', async (request, response) => {
    const reviews = await Review
        .find({})
        .populate('user', { username: 1, name: 1 })
    response.json(reviews)
})

reviewsRouter.get('/:id', async (request, response, next) => {
    const review = await review.findById(request.params.id)
    if (review) {
        response.json(review.toJSON())
    } else {
        response.status(404).end()
    }
})