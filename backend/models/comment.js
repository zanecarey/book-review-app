const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    likes: Number,
    dislikes: Number,
    review_id: String,
    comment: String,
    created_on: Date,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

commentSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject._v
    }
})

module.exports = mongoose.model('Comment', commentSchema)