import { useState } from 'react'

const Review = ({ user, review, handleVote, handleDeleteReview }) => {

    const [reviewObj, setReviewObj] = useState(review)

    const handleVoteChange = async (e) => {
        let updatedReview
        if (e.target.id === 'like') {
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
        setReviewObj(updatedReview)
    }



    return (
        <div>
            <div>
                {review.bookTitle} by {review.author} reviewed by {review.user.username}
            </div>
            <div>
                <p>{reviewObj.likes} likes {reviewObj.dislikes} dislikes<button id="like" onClick={handleVoteChange}>like</button> <button id="dislike" onClick={handleVoteChange}>dislike</button></p>
            </div>
        </div>
    )
}

export default Review