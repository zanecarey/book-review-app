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

const App = () => {
  const [reviews, setReviews] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ message: null, type: null })

  const [query, setQuery] = useState('')
  const [results, setResults] = useState([{ title: "title", author: "author" }])

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








  //Fetch all reviews on first render
  useEffect(() => {
    reviewService.getAll().then(reviews =>
      setReviews(reviews))
  }, [])

  //See if already logged in on first render
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedReviewAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      reviewService.setToken(user.token)
    }
  }, [])


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

  const addReview = (reviewObject) => {
    reviewFormRef.current.toggleVisibility()
    reviewService
      .create(reviewObject)
      .then(returnedReview => {
        setReviews(reviews.concat(returnedReview))
        sendNotification({ message: `new review added`, type: 'info' })
      })
      .catch(error => {
        sendNotification({ message: `Error: review could not be added`, type: 'error' })
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
        setReviews(reviews.map(r => r.id !== returnedReview.id ? r : returnedReview))
        sendNotification({ message: `review updated`, type: 'info' })
      })
      .catch(error => {
        sendNotification({ message: `Error: review not changed`, type: 'error' })
      })
  }

  const reviewFormRef = useRef()

  const match = useMatch('/books/:id')

  useEffect(() => {
    
    if(match) {
      reviewService.getOLBook(match.params.id).then(results => {
            const b =
            {
              title: results.title,
              author: results.authors[0].author.key,
              cover: results.covers[0],
              book_key: results.key.slice(7)
            }
            //console.log(b)
            setBook(b)
            console.log(book)
          })
    }
  }, [history])
  
  // const book = match
  //   ? reviewService.getOLBook(match.params.id).then(results => {
  //     const b =
  //     {
  //       title: results.title,
  //       author: results.authors[0].author.key,
  //       cover: results.covers[0],
  //       book_key: results.key.slice(7)
  //     }
  //     console.log(b)
  //     return b
  //   })
    // : null

  // const matchBook = () => {
  //   reviewService.getOLBook(match.params.id).then(results => {
  //     return 
  //     {
  //       title: results.title,
  //       author: results.authors[0].author.key,
  //       cover: results.covers[0],
  //       book_key: results.key.slice(7)
  //       }
  //   })
  // }


  return (
    <div>
      <h2>Book Reviews</h2>

      {/*  */}
      {user === null ?
        <Togglable buttonLabel='login'>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable> :
        <div>
          <p>{user.name} logged in</p>
          <Menu />
          <Routes>
            {/* <Route path="/reviews/:id" element={<Review review={review} user={user} handleVote={handleVote} />} /> */}
            <Route path="/about" element={<About />} />
            <Route path="/create_new" element={<ReviewForm createReview={addReview} />} />
            <Route path="/" element={<Home results={results} submitQuery={handleSubmit} handleChange={handleQueryChange} />} />
            <Route path="/reviews" element={<ReviewList reviews={reviews} user={user} handleVote={handleVote} />} />
            <Route path="/books/:id" element={<Book book={book} />} />
          </Routes>
        </div>
      }
      <Footer />
    </div>
  )
}

export default App;
