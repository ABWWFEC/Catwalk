import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import ReviewsList from './ReviewsList.jsx';
import ReviewsMetaData from './ReviewsMetaData.jsx';

export const ReviewsContext = createContext();

const Reviews = (props) => {
  const [ reviewsData, setReviewsData ] = useState({
    reviews: [],
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
    numberOfFilters: 0
  });
  const { reviews, numberOfReviews, prodId, sortParam, starFilteredList, starRatingsClicked, numberOfFilters } = reviewsData;

  const getReviewsData = (sorter) => {
    let config = {
      params: {
        sortBy: sorter
      }
    }

    axios.get(`/api/reviews/${props.prodId}`, config)
      .then(results => {
        if (numberOfFilters) {
          setReviewsData(prevReviewsData => ({
            ...prevReviewsData,
            starFilteredList: []
          }))

          for (const rating in starRatingsClicked) {
            if (starRatingsClicked[rating]) {
              let filteredReviews = results.data.results.filter(review => Number(rating) === review.rating);
              setReviewsData(prevReviewsData => ({
                ...prevReviewsData,
                starFilteredList: [...prevReviewsData.starFilteredList, ...filteredReviews]
              }))
            }
          }
        }

        setReviewsData(prevReviewsData => ({
          ...prevReviewsData,
          reviews: results.data.results,
          numberOfReviews: results.data.results.length,
          sortParam: sorter
        }))
      })
      .catch(err => console.log(`Couldn't fetch reviews :(`));
  }

  const handleStarRatingClick = (e) => {
    let starRating = e.target.dataset.rating;
    let filteredReviews = reviews.filter(review => Number(starRating) === review.rating);

    if (!starRatingsClicked[starRating]) {
      setReviewsData(prevReviewsData => ({
        ...prevReviewsData,
        starFilteredList: [...prevReviewsData.starFilteredList, ...filteredReviews],
        starRatingsClicked: {...prevReviewsData.starRatingsClicked, [starRating]: true},
        numberOfFilters: prevReviewsData.numberOfFilters + 1
      }))

      return;
    }

    filteredReviews = starFilteredList.filter(review => Number(starRating) !== review.rating);
    setReviewsData(prevReviewsData => ({
      ...prevReviewsData,
      starFilteredList: filteredReviews,
      starRatingsClicked: {...prevReviewsData.starRatingsClicked, [starRating]: false},
      numberOfFilters: prevReviewsData.numberOfFilters - 1
    }))
  }

  const handleResetFilterClick = () => {
    setReviewsData(prevReviewsData => ({
      ...prevReviewsData,
      starFilteredList: [],
      numberOfFilters: 0,
      starRatingsClicked: {
        1: false,
        2: false,
        3: false,
        4: false,
        5: false
      }
    }))
  }

  const providerValue = {
    ...reviewsData,
    getReviewsData,
    handleStarRatingClick,
    handleResetFilterClick
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
