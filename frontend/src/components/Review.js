import { useState } from 'react'
import { useMatch, useNavigate, useParams } from 'react-router-dom'
import CommentList from './CommentList'
import Togglable from './Togglable'
import CommentForm from './CommentForm'

const Review = ({ review, user, reviewComments, addComment, handleCommentVote }) => {

    //determine if on a reviews actual page
    const match = useMatch('/reviews/:id')

    return (
        <div>
            <div>
                {/* {review.bookTitle} by {review.author} reviewed by {review.user.username} */}
                {review.bookTitle} by {review.author} 
                <div>{review?.user?.username}</div>
                
                <div>{review.likes} likes {review.dislikes} dislikes</div>
                <p>{review.reviewBody}</p>
                <p>created on {review.created_on}</p>
            </div>

            <div>
                {match &&

                    <div>
                        <div>
                            <Togglable buttonLabel='Comment'>
                                <CommentForm addComment={addComment} review_id={review.id} user={user} />
                            </Togglable>
                            <div>
                                <h1>Comments</h1>
                                {/* <CommentList comments={comments} /> */}
                                <CommentList reviewComments={reviewComments} handleVote={handleCommentVote} />
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Review