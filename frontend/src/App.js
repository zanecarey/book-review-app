import { useState, useEffect, useRef } from 'react'
import Review from './components/Review'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Footer from './components/Footer'
import Togglable from './components/Togglable'
import ReviewForm from './components/ReviewForm'

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
          <Togglable buttonLabel="new review" ref={reviewFormRef}>
            <ReviewForm createReview={addReview} />
          </Togglable>
        </div>
      }

      {reviews.map(review =>
        <Review key={review.id} review={review} user={user} handleVote={handleVote} />
      )}
      <Footer />
    </div>
  )
}

export default App;
