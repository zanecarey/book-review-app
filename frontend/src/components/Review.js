import { useState } from 'react'

const Review = ({ user, review, hanldeLikeReview, handleDisklikeReview, handleDeleteReview}) => {





    return (
        <div style={reviewStyle}>
            <div>
                {review.bookTitle} by {review.author}
            </div>
        </div>
    )
}