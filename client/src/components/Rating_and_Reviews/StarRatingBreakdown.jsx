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
            <div className="col" style={{'max-width': '75px'}} data-rating={rating}>{rating} stars</div>
            <div className="col px-0" style={{'backgroundColor': '#ccc', 'max-width': '200px'}}>
              <div style={{'backgroundColor': '#05b105cf', width: `${(Math.floor((ratings[rating] / totalStarRatings()) * 100))}%`, height: '10px'}} data-rating={rating}></div>
            </div>
          </div>
        )
      })}
    </div>
  )
};

export default StarRatingBreakdown;