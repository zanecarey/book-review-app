import { useState } from 'react'
import reviewService from './services/reviews'
import ReviewForm from './ReviewForm'
const Book = ({ book, handleAdd }) => {

    //retrieve reviews for the current book
    reviewService.getAll().then(results => {
        
    })
    return (
        <div>
            <div>
                {book.title} by {book.author} 
            </div>
            <img src={`https://covers.openlibrary.org/b/id/${book.cover}-L.jpg`} alt="placeholder" />
            <ReviewForm createReview={handleAdd} id={book.book_id}/>
        </div>
    )
}

export default Book