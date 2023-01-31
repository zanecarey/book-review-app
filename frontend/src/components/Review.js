import { useState } from 'react'
import { useMatch, useNavigate, useParams } from 'react-router-dom'

const Review = ({ review, user }) => {

    return (
        <div>
            <div>
                {/* {review.bookTitle} by {review.author} reviewed by {review.user.username} */}
                {review.bookTitle} by {review.author} reviewed by {review?.user?.username}
                
            </div>
            <div>
                <p>{review.likes} likes {review.dislikes} dislikes</p>
            </div>
        </div>
    )
}

export default Review