import { useState } from 'react'

const ReviewForm = ({ addReview, book_id }) => {
  const [newBookTitle, setNewBookTitle] = useState('')
  const [newReviewTitle, setNewReviewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')


  const handleBookTitleChange = (event) => {
    setNewBookTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }
  const handleReviewTitleChange = (event) => {
    setNewReviewTitle(event.target.value)
  }

  const createReview = (event) => {
    event.preventDefault()
    addReview({
      bookTitle: newBookTitle,
      author: newAuthor,
      reviewTitle: newReviewTitle,
      book_id: book_id
    })
    console.log(book_id)
    setNewBookTitle('')
    setNewReviewTitle('')
    setNewAuthor('')
  }

  

  return (
    <div>
      <h2>Create a new Review</h2>

      <form onSubmit={createReview}>
        <div>
          book title:
          <input
            value={newBookTitle}
            onChange={handleBookTitleChange}
          />
        </div>
        <div>
          author:
          <input
            value={newAuthor}
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          review title:
          <input
            value={newReviewTitle}
            onChange={handleReviewTitleChange}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default ReviewForm