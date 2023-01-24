import { useState, useEffect } from 'react'
import { useMatch, useNavigate, useParams } from 'react-router-dom'
import reviewService from '../services/reviews'
import ReviewForm from './ReviewForm'
import ReviewList from './routecomps/ReviewList'

const Book = ({ book, addReview, bookReviews }) => {

    const navigate = useNavigate()
    const { params }= useParams()

    const [reviews, setReviews] = useState([])
    const [bookID, setBookID] = useState(book.book_id)

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
                    <ReviewForm addReview={addReview} book_id={book.book_id} />
                    <ReviewList reviews={bookReviews} />
                </div>

            }



        </div>
    )
}

export default Book