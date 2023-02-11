import { useState, useEffect, useRef } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route, Link,
  Navigate,
  useParams,
  useNavigate,
  useMatch,
} from "react-router-dom"
import Review from './components/Review'
import Book from './components/Book'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Footer from './components/Footer'
import Togglable from './components/Togglable'
import ReviewForm from './components/ReviewForm'
import About from './components/routecomps/About'
import Menu from './components/Menu'
import Home from './components/routecomps/Home'
import CreateNew from './components/routecomps/CreateNew'
import ReviewList from './components/routecomps/ReviewList'
import reviewService from './services/reviews'
import loginService from './services/login'
import userService from './services/users'
import Button from 'react-bootstrap/esm/Button'

const App = () => {
  const [review, setReview] = useState('')
  const [reviews, setReviews] = useState([])
  const [userReviews, setUserReviews] = useState([])
  const [bookReviews, setBookReviews] = useState([])
  const [reviewComments, setReviewComments] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [newName, setNewName] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ message: null, type: null })

  const [query, setQuery] = useState('')
  //const [results, setResults] = useState([{ title: "title", author: "author" }])
  const [results, setResults] = useState([])

  const [book, setBook] = useState('')

  const history = useNavigate()
  //QUERY HANDLE
  const handleQueryChange = (e) => {
    e.preventDefault()
    setQuery(e.target.value)
    console.log(e.target.value)
  }

  //Submit Query and show results
  const handleSubmit = (e) => {
    e.preventDefault()
    reviewService.query(query).then(results => {

      const arr = []
      for (let i = 0; i < 10; i++) {
        arr.push({
          title: results.docs[i].title,
          author: results.docs[i].author_name[0],
          cover: results.docs[i].cover_i,
          book_key: results.docs[i].key.slice(7)
        })
        console.log(results.docs[i].key.slice(7))
      }

      setResults(arr)
      results = []
    })
  }








  //FETCH ALL REVIEWS ON FIRST RENDER
  useEffect(() => {
    reviewService.getAll().then(reviews => {
      setReviews(reviews)
    })
  }, [])

  //See if already logged in on first render
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedReviewAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      console.log(user.id)
      reviewService.setToken(user.token)

      //Fetch users reviews
      reviewService.getUserReviews(user.id).then(reviews => {
        setUserReviews(reviews.reviews)
        console.log(reviews)
      })
    }
  }, [])

  // //FETCH USER'S REVIEWS
  // useEffect(() => {
  //   reviewService.getUserReviews(user.id).then(reviews => {
  //     setUserReviews(reviews.reviews)
  //     console.log(reviews)
  //   })
  //  }, [user])

  //Send login request with service
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      setUser(user)
      reviewService.setToken(user.token)
      window.localStorage.setItem(
        'loggedReviewAppUser', JSON.stringify(user)
      )
      setUsername('')
      setPassword('')
    } catch (exception) {
      sendNotification({ message: `Wrong Credentials`, type: 'error' })
    }
  }


  const handleLogout = () => {
    sendNotification({ message: `logged out`, type: 'info' })
    window.localStorage.removeItem('loggedReviewAppUser')
  }

  const handleNewUser = async (event) => {
    event.preventDefault()
    try {
      const user = await userService.createUser({
        username: newName, password: newPassword
      })

      setNewName('')
      setNewPassword('')
    } catch (exception) {
      sendNotification({ message: `password must be >3 characters`, type: 'error' })

    }
  }

  const addReview = (reviewObject) => {
    //reviewFormRef.current.toggleVisibility()
    reviewService
      .create(reviewObject)
      .then(returnedReview => {
        setBookReviews(bookReviews.concat(returnedReview))
        sendNotification({ message: `new review added`, type: 'info' })
      })
      .catch(error => {
        sendNotification({ message: `Error: review could not be added`, type: 'error' })
      })
  }

  const addComment = (commentObject) => {
    reviewService
      .createComment(commentObject)
      .then(returnedComment => {
        setReviewComments(reviewComments.concat(returnedComment))
        console.log(returnedComment)
      })
      .catch(error => {
        sendNotification({ message: `Error: comment could not be added`, type: 'error' })
      })
  }

  //Notification function that can be used for errors/confirmations
  const sendNotification = message => {
    setNotification(message)
    setTimeout(() => {
      setNotification({ message: null, type: null })
    }, 5000)
  }

  //Handle like/dislike functionality
  const handleVote = (reviewObject) => {
    reviewService
      .update(reviewObject)
      .then(returnedReview => {
        setBookReviews(bookReviews.map(r => r.user.id !== returnedReview.user.id ? r : returnedReview))
        sendNotification({ message: `review updated`, type: 'info' })
      })
      .catch(error => {
        sendNotification({ message: `Error: review not changed`, type: 'error' })
      })
  }

  const reviewFormRef = useRef()

  const match = useMatch('/books/:id')

  const reviewMatch = useMatch('/reviews/:id')

  //Fetch book if the route matches it's ID
  useEffect(() => {

    if (match) {
      reviewService.getOLBook(match.params.id).then(results => {
        const b =
        {
          title: results.title,
          author: results.authors[0].author.key,
          cover: results.covers[0],
          book_key: results.key.slice(7),
          // book_id: match.params.id
        }
        setBook(b)
        console.log(b)


        reviewService.getBookReviews({ id: b.book_key }).then(reviews => {
          setBookReviews(reviews)
          console.log(reviews)
        }
        )
      })
    }
  }, [history])

  //fetch review if the route matches it's id
  useEffect(() => {

    if (reviewMatch) {
      reviewService.getReview(reviewMatch.params.id).then(results => {
        let rev =
        {
          bookTitle: results.bookTitle,
          author: results.author,
          reviewTitle: results.reviewTitle,
          likes: results.likes,
          dislikes: results.dislikes,
          book_id: results.book_id,
          user: results.user,
          id: results.id,
          created_on: results.created_on
        }

        setReview(rev)
        console.log(rev.user)

        //FETCH COMMENTS FOR THE REVIEW
        reviewService.getComments({ id: reviewMatch.params.id }).then(results => {
          // let comments = 
          // {
          //   likes: results.likes,
          //   dislikes: results.dislikes,
          //   review_id: results.review_id,
          //   comment: results.comment
          // }

          setReviewComments(results)
          console.log(results)
        })


      })
    }

  }, [history, reviewMatch])

  return (
    <div>
      <h2>Book Reviews</h2>

      {/*  */}
      {user === null ?
        <div>

          <Togglable buttonLabel='login'>
            <LoginForm
              username={username}
              password={password}
              handleUsernameChange={({ target }) => setUsername(target.value)}
              handlePasswordChange={({ target }) => setPassword(target.value)}
              handleSubmit={handleLogin}
              btn='login'
            />
          </Togglable>


          <Togglable buttonLabel='new account'>
            <LoginForm
              username={newName}
              password={newPassword}
              handleUsernameChange={({ target }) => setNewName(target.value)}
              handlePasswordChange={({ target }) => setNewPassword(target.value)}
              handleSubmit={handleNewUser}
              btn='create'
            />
          </Togglable>
        </div>


        :

        <div>
          <div>
            <p>{user.username} logged in</p>
            <Button variant="primary" type="submit" onClick={handleLogout}>
              Logout
            </Button>
          </div>
          <Menu />
          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/create_new" element={<ReviewForm createReview={addReview} />} />
            <Route path="/" element={<Home results={results} submitQuery={handleSubmit} handleChange={handleQueryChange} />} />
            <Route path="/reviews" element={<ReviewList reviews={reviews} user={user} handleVote={handleVote} addComment={addComment} />} />
            <Route path="/books/:id" element={<Book book={book} addReview={addReview} bookReviews={bookReviews} handleVote={handleVote} addComment={addComment} />} />
            {/* {review && <Route path="/reviews/:id" element={<Review review={review} />} />} */}
            <Route path="/reviews/:id" element={<Review review={review} reviewComments={reviewComments} addComment={addComment} />} />

            <Route path="/my_reviews" element={<ReviewList reviews={userReviews} user={user} />} />
            {/* {user && <Route path="/my_reviews" element={<ReviewList reviews={userReviews} user={user} />} /> } */}



          </Routes>
        </div>
      }
      <Footer />
    </div>
  )
}

export default App;
