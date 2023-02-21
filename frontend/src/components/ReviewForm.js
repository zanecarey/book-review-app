import { useState, useEffect, useRef } from 'react'
import Button from 'react-bootstrap/Button'
import reviewService from '../services/reviews'

const ReviewForm = ({ addReview, book, name }) => {
  
  const [newReviewTitle, setNewReviewTitle] = useState('')
  const [textArea, setTextArea] = useState('Type Review')
  
 

 
  const handleReviewTitleChange = (event) => {
    setNewReviewTitle(event.target.value)
  }

  const handleTextAreaChange = (event) => {
    setTextArea(event.target.value)
  }

  const createReview = (event) => {
    event.preventDefault()
    addReview({
      bookTitle: book.title,
      author: name,
      reviewTitle: newReviewTitle,
      reviewBody: textArea,
      book_id: book.book_key
    })
    console.log(book)
    setNewReviewTitle('')
  }



  return (
    <div>
      <h2>Create a new Review</h2>

      <form onSubmit={createReview}>
        <div>
          review title:
          <input
            value={newReviewTitle}
            onChange={handleReviewTitleChange}
          />
        </div>

        <div>
          <textarea value={textArea} onChange={handleTextAreaChange} />
        </div>
        <Button type="submit">create</Button>
      </form>


    </div>
  )
}

export default ReviewForm