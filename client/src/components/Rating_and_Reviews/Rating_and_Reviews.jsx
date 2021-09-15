import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReviewsList from './ReviewsList.jsx';
import ReviewsMetaData from './ReviewsMetaData.jsx';

const Reviews = (props) => {
  const [ reviewsData, setReviewsData ] = useState({ reviews: [],
    numberOfReviews: null,
    prodId: props.prodId
  });
  const { reviews, numberOfReviews, prodId } = reviewsData;

  useEffect(() => {
    axios.get(`/api/reviews/${props.prodId}`)
      .then(results => {
        setReviewsData((prevReviewsData) => ({ ...prevReviewsData,
          reviews: results.data.results,
          numberOfReviews: results.data.results.length
        }))
      })
      .catch(err => console.log(`Couldn't fetch reviews :(`));
  }, []);

  return (
    <div>
      RATINGS & REVIEWS
      <ReviewsMetaData numberOfReviews={numberOfReviews} prodId={prodId} />
      <ReviewsList reviewsData={reviewsData} />
    </div>
  )
}

export default Reviews;
