import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import ReviewsList from './ReviewsList.jsx';
import ReviewsMetaData from './ReviewsMetaData.jsx';

export const ReviewsContext = createContext();

const Reviews = (props) => {
  const [ reviewsData, setReviewsData ] = useState({ reviews: [],
    numberOfReviews: null,
    prodId: props.prodId,
    sortParam: 'relevance',
    starFilter: [],
    isFiltered: false
  });
  const { reviews, numberOfReviews, prodId, sortParam, starFilter, isFiltered } = reviewsData;

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

  const providerValue = {
    ...reviewsData,
    getReviewsData
  }

  useEffect(() => {
    getReviewsData(sortParam);
  }, []);

  return (
    <div>
      RATINGS & REVIEWS
      <ReviewsContext.Provider value={providerValue}>
        <ReviewsMetaData />
        <ReviewsList />
      </ReviewsContext.Provider>
    </div>
  )
}

export default Reviews;
