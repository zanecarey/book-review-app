const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    bookTitle: String,
    author: String,
    reviewTitle: String,
    likes: Number,
    dislikes: Number,
    book_id: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

reviewSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject._v
    }
})

module.exports = mongoose.model('Review', reviewSchema)