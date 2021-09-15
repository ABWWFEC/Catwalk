import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ReviewsContext } from './Rating_and_Reviews.jsx';
import StarRatingBreakdown from './StarRatingBreakdown.jsx';
import CharacteristicsBreakdown from './CharacteristicsBreakdown.jsx';

const ReviewsMetaData = () => {
  // do i need this? hmmm
  const initialize = {
    "product_id": "",
    "ratings": {
        "1": "",
        "2": "",
        "3": "",
        "4": "",
        "5": ""
    },
    "recommended": {
        "false": "",
        "true": ""
    },
    "characteristics": {
        "Fit": {
            "id": 0,
            "value": ""
        },
        "Length": {
            "id": 0,
            "value": ""
        },
        "Comfort": {
            "id": 0,
            "value": ""
        },
        "Quality": {
            "id": 0,
            "value": ""
        },
        "Width": {
            "id": 0,
            "value": ""
        },
        "Size": {
            "id": 0,
            "value": ""
        }
    }
  };

  const [ reviewsMetaData, setReviewsMetaData ] = useState(initialize);
  const { ratings, recommended, characteristics } = reviewsMetaData;
  const { numberOfReviews, prodId } = useContext(ReviewsContext)

  const calculateAverage = (ratings) => {
    let sum = 0;
    for (var rating in ratings) {
      sum += rating * ratings[rating];
    }

    return (sum / numberOfReviews).toPrecision(2);
  }

  let percentRecommended = Math.floor((recommended.true / numberOfReviews) * 100)

  useEffect(() => {
    axios.get(`/api/reviews/meta/${prodId}`)
      .then((results) => setReviewsMetaData({
        "product_id": results.data.product_id,
        "ratings": {...ratings, ...results.data.ratings},
        "recommended": results.data.recommended,
        "characteristics": results.data.characteristics
        }))
      .catch((err) => console.log(`Couldn't get the metadata on reviews :(`, err));
  }, []);

  return (
    <div>
      <div>
        {calculateAverage(ratings) > 0 && <div>{calculateAverage(ratings)}</div>}
        <div>star rating</div>
        {percentRecommended > 0 && <div>{percentRecommended} percent reviews recommend this product</div>}
      </div>
      <StarRatingBreakdown ratings={ratings} />
      <CharacteristicsBreakdown characteristics={characteristics} />
    </div>
  )
}

export default ReviewsMetaData;