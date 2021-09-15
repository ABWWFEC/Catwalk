import React, { useState } from 'react';
import Review from './Review.jsx';

const ReviewsList = ({ reviewsData }) => {
  const { reviews, numberOfReviews, prodId } = reviewsData;
  const [ displayReviewsAmount, setDisplayReviewsAmount ] = useState(2);
  const [ maxReviewsReached, setMaxReviewsReached ] = useState(false);

  let displayedReviews = reviews.slice(0, displayReviewsAmount);

  const onMoreReviewsClick = () => {
    if (displayReviewsAmount >= numberOfReviews) {
      setMaxReviewsReached(true);
      return;
    }

    setDisplayReviewsAmount(displayReviewsAmount + 2);
  }

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
      {displayedReviews.map(reviewData => <Review key={reviewData.review_id} reviewData={reviewData} />)}
      <div>
        {(numberOfReviews > 2) && <button onClick={onMoreReviewsClick} >More Reviews</button>}
        {maxReviewsReached && <div>These are all the reviews!</div>}
      </div>
      <button>Add A Review</button>
    </div>
  )
}

export default ReviewsList;