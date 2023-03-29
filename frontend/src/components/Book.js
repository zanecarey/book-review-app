import { useState, useEffect } from 'react'
import { useMatch, useNavigate, useParams } from 'react-router-dom'
import reviewService from '../services/reviews'
import ReviewForm from './ReviewForm'
import ReviewList from './routecomps/ReviewList'
import Togglable from './Togglable'
const Book = ({ book, addReview, bookReviews, handleVote, addComment, sendNotification }) => {

    const [authorName, setAuthorName] = useState(book?.author)
    //const [currentCover, setCover] = useState(book?.covers[0])

    //determine ifon a book's page or on home page
    const match = useMatch('/books/:id')

    //fetch authors name based off their api id
    useEffect(() => {
        if (book.author && match) {
            reviewService.findAuthorName(book.author).then(results => {
                setAuthorName(results.name)
                console.log(results.name)
            })
        }

    }, [book.author])

    return (
        <div>
            <div>
                {book.title} by {authorName}
            </div>
            <div>
                <img src={`https://covers.openlibrary.org/b/id/${book.cover}-L.jpg`} alt="placeholder" />
            </div>

            {match
                &&

                <div>
                    {book.covers ? <img src={`https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`} alt="placeholder" /> : null}
                    <p>{book.description}</p>
                    <Togglable buttonLabel='Add Review'>
                        <ReviewForm addReview={addReview} book={book} name={authorName} sendNotification={sendNotification} />
                    </Togglable>

                    <ReviewList reviews={bookReviews} handleVote={handleVote} addComment={addComment} />
                </div>

            }



        </div>
    )
}

export default Book