import { useState } from 'react'
import { useMatch, useNavigate, useParams } from 'react-router-dom'
import Comment from './Comment'

const CommentList = ({ reviewComments }) => {


    return (
        <div>
            <ul>
                {/* Sort reviews by likes */}
                {reviewComments.sort(((a, b) => b.likes - a.likes)).map((comment) => (
                    <li key={comment.id}>
                        <Comment comment={comment} />
                        {/* <Button variant="primary" id="like" onClick={() => handleLike(review, 'like')} >like</Button><Button variant="primary" id="dislike" onClick={() => handleLike(review, 'dislike')}>dislike</Button> */}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default CommentList