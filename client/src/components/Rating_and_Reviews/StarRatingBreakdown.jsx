import React, { useContext } from 'react';
import { ReviewsContext } from './Rating_and_Reviews.jsx';

const StarRatingBreakdown = ({ ratings }) => {
  const { numberOfReviews, handleStarRatingClick, starRatingsClicked, numberOfFilters, handleResetFilterClick } = useContext(ReviewsContext)
  let starRatings = Object.keys(ratings);
  let reversedRatings = [...starRatings].reverse();

  const notifySelectedFilters = () => {
    let selectedRatings = starRatings.filter(rating => starRatingsClicked[rating]).join(', ');

    if (numberOfFilters) {
      return (
        <div>
          {selectedRatings} star rating filter applied | <span onClick={() => handleResetFilterClick()}>Reset review filter</span>
        </div>
      )
    }
  };

  return (
    <div>
      <div>Rating Breakdown</div>
      {notifySelectedFilters()}
      {numberOfReviews > 0 && reversedRatings.map(rating =>
        <div key={rating} data-rating={rating} onClick={(e) => handleStarRatingClick(e)}>
          {rating} stars <span>{Math.floor((ratings[rating] / numberOfReviews) * 100)} bar</span>
        </div>
      )}
    </div>
  )
};

export default StarRatingBreakdown;