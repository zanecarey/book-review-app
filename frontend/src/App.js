import { useState, useEffect, useRef } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route, Link,
  Navigate,
  useParams,
  useNavigate,
  useMatch
} from "react-router-dom"
import Review from './components/Review'
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

  //Fetch all reviews on first render
  useEffect(() => {
    reviewService.getAll().then(reviews =>
      setReviews(reviews))
    //test OPEn Library Call
    reviewService.getOLBook().then(book => 
      setReviews(reviews.concat(book.title)))
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

  const match = useMatch('/reviews/:id')

  const review = match
    ? reviews.find(review => review.id === Number(match.params.id))
    : reviews.find(review => review.id === '63734fc6ac5bc2e0587ff08b')
   console.log(reviews)
   console.log(review)
   console.log(match)

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
            <Route path="/reviews/:id" element={<Review review={review} user={user} handleVote={handleVote}/>} />
            <Route path="/about" element={<About />} />
            <Route path="/create_new" element={<ReviewForm createReview={addReview} />} />
            <Route path="/" element={<Home />} />
            <Route path="/reviews" element={<ReviewList reviews={reviews} user={user} handleVote={handleVote}/>} />
          </Routes>
        </div>
      }
      <Footer />
    </div>
  )
}

export default App;
