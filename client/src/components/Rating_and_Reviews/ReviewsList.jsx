import React from 'react';
import Review from './Review.jsx';

const ReviewsList = ({ reviewsData }) => {
  const { reviews, numberOfReviews, prodId } = reviewsData;

  return (
    <div>
      {reviews.map(reviewData => <Review key={reviewData.review_id} reviewData={reviewData} />)}
      {(numberOfReviews > 2) && <button>More Reviews</button>}
      <button>Add A Review</button>
    </div>
  )
}

export default ReviewsList;