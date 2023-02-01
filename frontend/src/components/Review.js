import { useState } from 'react'
import { useMatch, useNavigate, useParams } from 'react-router-dom'
import CommentList from './CommentList'
const Review = ({ review, user, comments }) => {

    //determine if on a reviews actual page
    const match = useMatch('/reviews/:id')

    return (
        <div>
            <div>
                {/* {review.bookTitle} by {review.author} reviewed by {review.user.username} */}
                {review.bookTitle} by {review.author} reviewed by {review?.user?.username}

            </div>
            <div>
                <p>{review.likes} likes {review.dislikes} dislikes</p>
            </div>
            <div>
                {match &&
                    <div>
                        {/* <CommentList comments={comments} /> */}
                        
                    </div>
                }
            </div>
        </div>
    )
}

export default Review