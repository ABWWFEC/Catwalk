import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReviewsList from './ReviewsList.jsx';
import ReviewsMetaData from './ReviewsMetaData.jsx';

const Reviews = (props) => {
  const [ reviewsData, setReviewsData ] = useState({ reviews: [], numberOfReviews: 0, prodId: props.prodId });

  useEffect(() => {
    axios.get(`/api/reviews/${props.prodId}`)
      .then(results => {
        setReviewsData({ ...reviewsData,
          reviews: results.data.results ,
          numberOfReviews: results.data.results.length
        })
      })
      .catch(err => console.log(`Couldn't fetch reviews :(`));
  }, []);

  return (
    <div>
      <ReviewsMetaData numberOfReviews={reviewsData.numberOfReviews} prodId={reviewsData.prodId} />
      <ReviewsList reviewsData={reviewsData} />
    </div>
  )
}

export default Reviews;
