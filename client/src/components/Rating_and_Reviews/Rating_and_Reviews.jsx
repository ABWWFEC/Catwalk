import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReviewsList from './ReviewsList.jsx';
import ReviewsMetaData from './ReviewsMetaData.jsx';

const Reviews = (props) => {
  const [ reviewsData, setReviewsData ] = useState({ reviews: [],
    numberOfReviews: null,
    prodId: props.prodId,
    sortParam: 'relevance'
  });
  const { reviews, numberOfReviews, prodId, sortParam } = reviewsData;

  const getReviewsData = (sorter) => {
    let config = {
      params: {
        sortBy: sorter
      }
    }

    setReviewsData({...reviewsData, sortParam: sorter});

    axios.get(`/api/reviews/${props.prodId}`, config)
    .then(results => {
      setReviewsData({
        ...reviewsData,
        reviews: results.data.results,
        numberOfReviews: results.data.results.length
      })
    })
    .catch(err => console.log(`Couldn't fetch reviews :(`));
  }

  useEffect(() => {
    getReviewsData(sortParam);
  }, []);

  return (
    <div>
      RATINGS & REVIEWS
      <ReviewsMetaData numberOfReviews={numberOfReviews} prodId={prodId} />
      <ReviewsList reviewsData={reviewsData} sortReviews={getReviewsData} />
    </div>
  )
}

export default Reviews;
