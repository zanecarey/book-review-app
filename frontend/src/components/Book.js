import { useState, useEffect } from 'react'
import { useMatch, useNavigate, useParams } from 'react-router-dom'
import reviewService from '../services/reviews'
import ReviewForm from './ReviewForm'
import ReviewList from './routecomps/ReviewList'
import Togglable from './Togglable'
const Book = ({ book, addReview, bookReviews, handleVote }) => {

    // const navigate = useNavigate()
    // const { params } = useParams()

    // const [reviews, setReviews] = useState([])
    // const [bookID, setBookID] = useState(book.book_key)

    //determine ifon a book's page or on home page
    const match = useMatch('/books/:id')
    //console.log(book.title)


    return (
        <div>
            <div>
                {book.title} by {book.author}
            </div>
            <img src={`https://covers.openlibrary.org/b/id/${book.cover}-L.jpg`} alt="placeholder" />
            {match
                &&
                <div>
                    <Togglable buttonLabel='Add Review'>
                        <ReviewForm addReview={addReview} book_key={book.book_key} />
                    </Togglable>

                    <ReviewList reviews={bookReviews} handleVote={handleVote} />
                </div>

            }



        </div>
    )
}

export default Book