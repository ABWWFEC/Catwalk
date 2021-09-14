import React from 'react';
import Review from './Review.jsx';

const ReviewsList = ({ reviewsData }) => {
  const { reviews, numberOfReviews, prodId } = reviewsData;

  return (
    <div>
      <div>
        {numberOfReviews} reviews, sorted by
        <select>
          <option key={'criteria name'}>some criteria 1</option>
          <option key={'criteria name 2'}>some criteria 2</option>
          <option key={'criteria name 3'}>some criteria 3</option>
        </select>
      </div>
      {reviews.map(reviewData => <Review key={reviewData.review_id} reviewData={reviewData} />)}
      {(numberOfReviews > 2) && <button>More Reviews</button>}
      <button>Add A Review</button>
    </div>
  )
}

export default ReviewsList;