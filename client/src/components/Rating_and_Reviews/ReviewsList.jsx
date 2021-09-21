import React, { useState, useContext } from 'react';
import { ReviewsContext } from './Rating_and_Reviews.jsx';
import Review from './Review.jsx';
import AddReview from './AddReview.jsx';

const ReviewsList = () => {
  const [ displayReviewsAmount, setDisplayReviewsAmount ] = useState(2);
  const [ addReviewClicked, setAddReviewclicked ] = useState(false);
  const { reviews, numberOfReviews, prodId, getReviewsData, starFilteredList, numberOfFilters } = useContext(ReviewsContext);

  let currNumberOfReviews = numberOfFilters ? starFilteredList.length : numberOfReviews;

  const displayedReviews = () => {
    let displayed = numberOfFilters
      ? starFilteredList.slice(0, displayReviewsAmount)
      : reviews.slice(0, displayReviewsAmount);

    return displayed.map(reviewData => <Review key={reviewData.review_id} reviewData={reviewData} />);
  }

  const handleMoreReviewsClick = () => {
    if (numberOfReviews > displayReviewsAmount) {
      setDisplayReviewsAmount(displayReviewsAmount + 2);
    }
  }

  const handleAddAReviewClick = () => {
    setAddReviewclicked(!addReviewClicked);
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
        {(currNumberOfReviews > 2) && <button onClick={handleMoreReviewsClick} >More Reviews</button>}
        {(currNumberOfReviews <= displayReviewsAmount) && <div>These are all the reviews!</div>}
      </div>
      <button onClick={handleAddAReviewClick}>Add A Review</button>
      {addReviewClicked && <AddReview product_id={prodId} />}
    </div>
  )
}

export default ReviewsList;