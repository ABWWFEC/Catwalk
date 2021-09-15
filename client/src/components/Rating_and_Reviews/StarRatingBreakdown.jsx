import React, { useContext } from 'react';
import { ReviewsContext } from './Rating_and_Reviews.jsx';

const StarRatingBreakdown = ({ ratings }) => {
  const { numberOfReviews } = useContext(ReviewsContext)
  let reversedRatings = Object.keys(ratings).reverse()

  return (
    <div>
      {numberOfReviews > 0 && reversedRatings.map(rating =>
        <div key={rating}>
          {rating} stars <span>{Math.floor((ratings[rating] / numberOfReviews) * 100)} bar</span>
        </div>
      )}
    </div>
  )
};

export default StarRatingBreakdown;