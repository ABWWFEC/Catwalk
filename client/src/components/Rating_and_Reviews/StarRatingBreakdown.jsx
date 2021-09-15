import React from 'react';

const StarRatingBreakdown = ({ ratings, numberOfReviews }) => {
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