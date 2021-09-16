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
    starFilteredList: [],
    starRatingsClicked: {
      1: false,
      2: false,
      3: false,
      4: false,
      5: false
    },
    starFiltered: 0
  });
  const { reviews, numberOfReviews, prodId, sortParam, starFilteredList, starRatingsClicked, starFiltered } = reviewsData;

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

  const handleStarRatingClick = (e) => {
    let starRating = e.target.dataset.rating;
    let filteredReviews = reviews.filter(review => Number(starRating) === review.rating);

    if (!starRatingsClicked[starRating]) {
      setReviewsData({
        ...reviewsData,
        starFilteredList: [...starFilteredList, ...filteredReviews],
        starRatingsClicked: {...starRatingsClicked, [starRating]: true},
        starFiltered: starFiltered + 1
      })

      return;
    }

    filteredReviews = starFilteredList.filter(review => Number(starRating) !== review.rating);
    setReviewsData({
      ...reviewsData,
      starFilteredList: filteredReviews,
      starRatingsClicked: {...starRatingsClicked, [starRating]: false},
      starFiltered: starFiltered - 1
    })
  }

  const providerValue = {
    ...reviewsData,
    getReviewsData,
    handleStarRatingClick
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
