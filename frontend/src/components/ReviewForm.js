import { useState } from 'react'

const ReviewForm = ({ createReview, book_id }) => {
  const [newBookTitle, setNewBookTitle] = useState('')
  const [newReviewTitle, setNewReviewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')

  const id = book_id

  const handleBookTitleChange = (event) => {
    setNewBookTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }
  const handleReviewTitleChange = (event) => {
    setNewReviewTitle(event.target.value)
  }

  const addReview = (event) => {
    event.preventDefault()
    createReview({
      bookTitle: newBookTitle,
      author: newAuthor,
      reviewTitle: newReviewTitle,
      book_id: id
    })

    setNewBookTitle('')
    setNewReviewTitle('')
    setNewAuthor('')
  }

  

  return (
    <div>
      <h2>Create a new Review</h2>

      <form onSubmit={addReview}>
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