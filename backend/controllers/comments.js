const commentsRouter = require('express').Router()
const config = require('../utils/config')
const Comment = require('../models/comment')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { default: mongoose } = require('mongoose')
const comment = require('../models/comment')

//GET TOKEN FROM FUNCTION
const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}


commentsRouter.get('/', async (request, response) => {
    const comments = await Comment
        .find({})
        .populate('user', { username: 1 })

    response.json(comments)
})

commentsRouter.post('/', async (request, response, next) => {
    const body = request.body

    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)


    if (Object.keys(body).length <= 1) {
        const comments = await Comment
            .find({ review_id: body.id })
            .populate('user', { username: 1 })
            .exec()
        response.json(comments)

    } else {
        const comment = new Comment({
            comment: body.comment,
            likes: body.likes || 0,
            dislikes: body.dislikes || 0,
            review_id: body.review_id,
            user: user._id
        })
        const savedComment = await comment.save()
        user.comments = user.comments.concat(savedComment._id)
        await user.save()
        response.status(201).json(savedComment)
    }


})

commentsRouter.delete('/:id', async (request, response, next) => {
    await Comment.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

commentsRouter.put('/:id', async (request, response, next) => {
    const body = request.body

    const comment = {
        comment: body.comment,
        likes: body.likes || 0,
        dislikes: body.dislikes || 0,
        review_id: body.review_id,
        user: user._id
    }


    Comment.findByIdAndUpdate(request.params.id, comment, { new: true })
        .then(updatedComment => {
            response.json(updatedComment.toJSON())
        })
        .catch(error => next(error))

})
module.exports = commentsRouter