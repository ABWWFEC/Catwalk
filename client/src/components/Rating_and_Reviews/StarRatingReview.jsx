import React, { useState, useContext } from 'react';
import { IoIosStarOutline, IoIosStar } from 'react-icons/io';
import { ReviewFormContext } from './AddReview.jsx';

const StarRatingReview = () => {
  const { rating, handleInputChange } = useContext(ReviewFormContext);

  const ratingDescriptor = () => {
    if (rating === 1) {
      return 'Poor';
    }

    if (rating === 2) {
      return 'Fair';
    }

    if (rating === 3) {
      return 'Average';
    }

    if (rating === 4) {
      return 'Good';
    }

    if (rating === 5) {
      return 'Great';
    }
  }

  return (
    <div className="row">
      <div>Rate this product!</div>
      <div className="row align-items-center">
        {[...Array(5)].map((starRating, index) => {
          index += 1;
          return (
            <label className="col-auto px-1">
              <input
                className="star-rating"
                type="radio"
                key={index}
                value={index}
                name="rating"
                checked={rating === index}
                onChange={e => handleInputChange(e)}/>
              {index <= rating && <IoIosStar size={'2em'} key={`up to star ${index}`}/>}
              {index > rating && <IoIosStarOutline size={'2em'} key={`star ${index}`}/>}
            </label>
          )
        })}
        <label className="col">{ratingDescriptor()}</label>
      </div>
    </div>
  )
}

export default StarRatingReview;