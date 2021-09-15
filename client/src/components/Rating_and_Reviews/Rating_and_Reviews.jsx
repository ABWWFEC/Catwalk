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
      <div>
        {numberOfReviews} reviews, sorted by
        <select>
          <option key={'criteria name'}>some criteria 1</option>
          <option key={'criteria name 2'}>some criteria 2</option>
          <option key={'criteria name 3'}>some criteria 3</option>
        </select>
      </div>
      <ReviewsList reviewsData={reviewsData} />
    </div>
  )
}

export default Reviews;
