import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ReviewsContext } from './Rating_and_Reviews.jsx';
import StarRatingBreakdown from './StarRatingBreakdown.jsx';
import CharacteristicsBreakdown from './CharacteristicsBreakdown.jsx';

const ReviewsMetaData = () => {
  const { reviewsMetaData, numberOfReviews, prodId } = useContext(ReviewsContext)
  const { ratings, recommended, characteristics } = reviewsMetaData;

  const calculateAverage = (ratings) => {
    let sum = 0;
    for (var rating in ratings) {
      sum += rating * ratings[rating];
    }

    return (sum / numberOfReviews).toPrecision(2);
  }

  let percentRecommended = Math.floor((recommended.true / numberOfReviews) * 100)

  return (
    <div>
      <div>
        {(calculateAverage(ratings) > 0 && calculateAverage(ratings) !== Infinity) && <div>{calculateAverage(ratings)}</div>}
        <div>star rating</div>
        {(percentRecommended > 0 && percentRecommended !== Infinity) && <div>{percentRecommended} percent reviews recommend this product</div>}
      </div>
      <StarRatingBreakdown ratings={ratings} />
      <CharacteristicsBreakdown characteristics={characteristics} />
    </div>
  )
}

export default ReviewsMetaData;