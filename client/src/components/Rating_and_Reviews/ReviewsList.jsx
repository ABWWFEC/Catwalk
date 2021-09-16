import React, { useState, useContext } from 'react';
import { ReviewsContext } from './Rating_and_Reviews.jsx';
import Review from './Review.jsx';

const ReviewsList = () => {
  // const { reviews, numberOfReviews, prodId } = reviewsData;
  const [ displayReviewsAmount, setDisplayReviewsAmount ] = useState(2);
  const [ maxReviewsReached, setMaxReviewsReached ] = useState(false);
  const { reviews, numberOfReviews, prodId, getReviewsData, starFilteredList, numberOfFilters } = useContext(ReviewsContext);

  const displayedReviews = () => {
    let displayed;

    numberOfFilters
      ? displayed = starFilteredList.slice(0, displayReviewsAmount)
      : displayed = reviews.slice(0, displayReviewsAmount);

    return displayed.map(reviewData => <Review key={reviewData.review_id} reviewData={reviewData} />);
  }

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
        <select onChange={(e) => getReviewsData(e.target.value) }>
          <option value={'relevant'}>relevant</option>
          <option value={'newest'}>newest</option>
          <option value={'helpful'}>helpful</option>
        </select>
      </div>
      {displayedReviews()}
      <div>
        {(numberOfReviews > 2) && <button onClick={onMoreReviewsClick} >More Reviews</button>}
        {maxReviewsReached && <div>These are all the reviews!</div>}
      </div>
      <button>Add A Review</button>
    </div>
  )
}

export default ReviewsList;