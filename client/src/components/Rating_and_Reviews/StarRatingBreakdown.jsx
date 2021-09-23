import React, { useContext } from 'react';
import { ReviewsContext } from './Rating_and_Reviews.jsx';

const StarRatingBreakdown = ({ ratings, totalStarRatings }) => {
  const { handleStarRatingClick, starRatingsClicked, numberOfFilters, handleResetFilterClick } = useContext(ReviewsContext)
  let starRatings = Object.keys(ratings);
  let reversedRatings = [...starRatings].reverse();

  const notifySelectedFilters = () => {
    let selectedRatings = starRatings.filter(rating => starRatingsClicked[rating]).join(', ');

    if (numberOfFilters) {
      return (
        <div className="row">
          {selectedRatings} star rating filter applied | <span onClick={() => handleResetFilterClick()}>Reset review filter</span>
        </div>
      )
    }
  };

  return (
    <div className="row" style={{height: '40%'}}>
      <div className="h5">Rating Breakdown</div>
      {notifySelectedFilters()}
      {totalStarRatings() > 0 && reversedRatings.map(rating => {
        return (
          <div className="row align-items-center" key={rating} data-rating={rating} onClick={(e) => handleStarRatingClick(e)}>
            <div className="col star-ratings" data-rating={rating}>{rating} stars</div>
            <div className="col px-0 rating-graph">
              <div className="rating-percent" style={{width: `${(Math.floor((ratings[rating] / totalStarRatings()) * 100))}%`}} data-rating={rating}></div>
            </div>
          </div>
        )
      })}
    </div>
  )
};

export default StarRatingBreakdown;