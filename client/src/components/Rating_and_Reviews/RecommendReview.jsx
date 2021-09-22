import React, { useContext } from 'react';
import { ReviewFormContext } from './AddReview.jsx'

const RecommendReview = () => {
  const { recommend, handleInputChange } = useContext(ReviewFormContext);

  return (
    <div className="row">
      <div>Would you recommend this product?</div>
      <div className="col-2">
        <label className="radio-inline">
          <input
            type="radio"
            name="recommend"
            value={true}
            checked={recommend === 'true'}
            onChange={e => handleInputChange(e)}></input>
          Yes
        </label>
      </div>
      <div className="col-2">
        <label className="radio-inline">
          <input
            type="radio"
            name="recommend"
            value={false}
            checked={recommend === 'false'}
            onChange={e => handleInputChange(e)}></input>
          No
        </label>
      </div>
    </div>
  )
}

export default RecommendReview;