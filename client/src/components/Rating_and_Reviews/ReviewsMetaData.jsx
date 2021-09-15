import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReviewsMetaData = ({ numberOfReviews, prodId }) => {
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

  const calculateAverage = (ratings) => {
    let sum = 0;
    for (var rating in ratings) {
      // sum += (Number(rating) * Number(ratings[rating]));
      sum += rating * ratings[rating];
    }

    return (sum / numberOfReviews).toPrecision(2);
  }

  const calculatePercent = (recommendedTrue) => {
    let percent = (recommendedTrue / numberOfReviews) * 100;

    return Math.floor(percent);
  }

  useEffect(() => {
    axios.get(`/api/reviews/meta/${prodId}`)
      .then((results) => setReviewsMetaData(results.data))
      .catch((err) => console.log(`Couldn't get the metadata on reviews :(`, err));
  }, []);

  console.log(Math.floor((recommended.true / numberOfReviews) * 100));

  return (
    <div>
      <div>
        {calculateAverage(ratings) > 0 && <div>{calculateAverage(ratings)}</div>}
        <div>star rating</div>
        {calculatePercent(recommended.true) > 0 && <div>{calculatePercent(recommended.true)} percent reviews recommend this product</div>}
      </div>
      <div>star rating break down</div>
      <div>characteristics</div>
    </div>
  )
}

export default ReviewsMetaData;