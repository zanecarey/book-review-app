import React, { useEffect, useState } from 'react'
import Review from '../Review'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

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

  console.log(reviews)
  
  return (
    <div>
      <h2>Reviews</h2>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <Link to={`/reviews/${review.id}`}>{<Review  review={review} />}</Link>
            {/* <button id="like" onClick={() => { handleLike(review) }}>like</button> <button id="dislike" onClick={handleLike}>dislike</button> */}
            {/* <button id="like" onClick={() => setReviewObj(review)}>like</button> <button id="dislike" onClick={setReviewObj(review)}>dislike</button> */}
            {/* <button id="like" onClick={() => setReviewObj(review)}>like</button> <button id="dislike" onClick={() =>setReviewObj(review)}>dislike</button> */}
            <Button variant="primary" id="like" onClick={() => handleLike(review, 'like')} >like</Button><Button variant="primary" id="dislike" onClick={() => handleLike(review, 'dislike')}>dislike</Button>
          </li>
        ))}
      </ul>
    </div>
  )

}

export default ReviewList

