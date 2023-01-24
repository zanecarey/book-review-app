const reviewsRouter = require('express').Router()
const config = require('../utils/config')
const Review = require('../models/review')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { default: mongoose } = require('mongoose')


//GET TOKEN FROM FUNCTION
const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}

reviewsRouter.get('/', async (request, response) => {
    const reviews = await Review
        .find({})
        .populate('user', { username: 1, name: 1 })



    // .find({ book_id: request.params.id })
    // .populate('user', { username: 1, name: 1 })

    response.json(reviews)
})

reviewsRouter.get('/:id', async (request, response, next) => {
    const review = await Review.findById(request.params.id)
    if (review) {
        response.json(review.toJSON())
    } else {
        response.status(404).end()
    }
})

reviewsRouter.post('/', async (request, response, next) => {
    const body = request.body

    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    if (Object.keys(body).length <= 1) {
        const reviews = await Review
            .find({ book_id: body.id })
            .populate('user', { username: 1, name: 1 })
            response.json(reviews)
    } else {
        const review = new Review({
            bookTitle: body.bookTitle,
            author: body.author,
            reviewTitle: body.reviewTitle,
            likes: body.likes || 0,
            dislikes: body.dislikes || 0,
            book_id: body.book_id,
            user: user._id
        })
        const savedReview = await review.save()
        user.reviews = user.reviews.concat(savedReview._id)
        await user.save()
        response.status(201).json(savedReview)
    }



})

reviewsRouter.delete('/:id', async (request, response, next) => {
    await Review.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

reviewsRouter.put('/:id', async (request, response, next) => {
    const body = request.body

    const review = {
        bookTitle: body.bookTitle,
        author: body.author,
        reviewTitle: body.reviewTitle,
        likes: body.likes,
        dislikes: body.dislikes,
        book_id: body.book_id
    }


    Review.findByIdAndUpdate(request.params.id, review, { new: true })
        .then(updatedReview => {
            response.json(updatedReview.toJSON())
        })
        .catch(error => next(error))

})
module.exports = reviewsRouter