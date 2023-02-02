import { useState } from 'react'
import { useMatch, useNavigate, useParams } from 'react-router-dom'

const Comment = ({ comment }) => {

    return (
        <div>
            <h3>
                {comment.user.username}
            </h3>
            <p>{comment.comment}</p>
            <p>{comment.likes}likes {comment.dislikes} dislikes</p>
        </div>


    )
}

export default Comment