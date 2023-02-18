import { useState } from 'react'
import Button from 'react-bootstrap/Button'
const CommentForm = ({ addComment, review_id, user }) => {

  const [newComment, setNewComment] = useState('')


  const handleCommentChange = (event) => {
    setNewComment(event.target.value)
  }
//   const handleAuthorChange = (event) => {
//     setNewAuthor(event.target.value)
//   }
//   const handleReviewTitleChange = (event) => {
//     setNewReviewTitle(event.target.value)
//   }

  const createComment = (event) => {
    event.preventDefault()
    addComment({
      comment: newComment,
      review_id: review_id
    })
    // console.log(book_key)
    setNewComment('')
    // setNewReviewTitle('')
    // setNewAuthor('')
  }

  

  return (
    <div>
      <h2>Add Comment</h2>

      <form onSubmit={createComment}>
        <div>
          comment body:
          <input
            value={newComment}
            onChange={handleCommentChange}
          />
          <Button type="submit">create</Button>
        </div>
        
      </form>
    </div>
  )
}

export default CommentForm