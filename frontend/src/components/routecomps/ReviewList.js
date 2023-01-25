import React, { useEffect, useState } from 'react'
import Review from '../Review'
import { Link } from 'react-router-dom'

const ReviewList = ({ reviews, user, handleVote }) => {

  const [reviewObj, setReviewObj] = useState({})
  const [reviewArr, setReviewArr] = useState(reviews)

  const handleLike = (review, btn) => {
    console.log(review)
    if (Object.entries(review).length !== 0) {

      let updatedReview
      if (btn === 'like') {
        updatedReview = {
          ...review,
          likes: review.likes + 1
        }
      } else {
        updatedReview = {
          ...review,
          dislikes: review.dislikes + 1
        }
      }
      handleVote(updatedReview)
      //setReviewArr(reviewArr.concat(updatedReview))
    }
  }

  return (
    <div>
      <h2>Reviews</h2>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <Link to={`/reviews/${review.id}`}>{<Review key={review.id} review={review} user={user} handleVote={handleVote} />}</Link>
            {/* <button id="like" onClick={() => { handleLike(review) }}>like</button> <button id="dislike" onClick={handleLike}>dislike</button> */}
            {/* <button id="like" onClick={() => setReviewObj(review)}>like</button> <button id="dislike" onClick={setReviewObj(review)}>dislike</button> */}
            {/* <button id="like" onClick={() => setReviewObj(review)}>like</button> <button id="dislike" onClick={() =>setReviewObj(review)}>dislike</button> */}
            <button id="like" onClick={() => handleLike(review, 'like')}>like</button> <button id="dislike" onClick={() => handleLike(review, 'dislike')}>dislike</button>
          </li>
        ))}
      </ul>
    </div>
  )

}

export default ReviewList

