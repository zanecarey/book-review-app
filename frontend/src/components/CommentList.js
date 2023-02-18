import { useState } from 'react'
import { useMatch, useNavigate, useParams } from 'react-router-dom'
import Comment from './Comment'
import Button from 'react-bootstrap/Button'

const CommentList = ({ reviewComments, handleVote }) => {

    const handleLike = (comment, btn) => {
        console.log(comment)
        if (Object.entries(comment).length !== 0) {
    
          let updatedComment
          if (btn === 'like') {
            updatedComment = {
              ...comment,
              likes: comment.likes + 1
            }
          } else {
            updatedComment = {
              ...comment,
              dislikes: comment.dislikes + 1
            }
          }
          handleVote(updatedComment)
        }
      }

    return (
        <div>
            <ul>
                {/* Sort reviews by likes */}
                {reviewComments.sort(((a, b) => b.likes - a.likes)).map((comment) => (
                    <li key={comment.id}>
                        <Comment comment={comment} />
                        <Button variant="primary" id="like" onClick={() => handleLike(comment, 'like')} >like</Button><Button variant="primary" id="dislike" onClick={() => handleLike(comment, 'dislike')}>dislike</Button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default CommentList