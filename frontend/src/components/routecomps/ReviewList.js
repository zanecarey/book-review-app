import React from 'react'
import Review from '../Review'
import { Link } from 'react-router-dom'

const ReviewList = ({ reviews, user, handleVote }) => (
    <div>
      <h2>Reviews</h2>
      <ul>
      {reviews.map((review) => (
        <li key={review.id}>
          <Link to={`/reviews/${review.id}`}>{<Review key={review.id} review={review} user={user} handleVote={handleVote} />}</Link>
        </li>
      ))}
    </ul>
    </div>
  )

export default ReviewList

