import { useState } from 'react'

const Review = ({ user, review, handleVote, handleDeleteReview }) => {

    console.log(review)
    return (
        <div>
            <div>
                {review.bookTitle} by {review.author} reviewed by 
            </div>
            <div>
                <p>{review.likes} likes {review.dislikes} dislikes</p>
            </div>
        </div>
    )
}

export default Review