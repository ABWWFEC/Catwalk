import React, { useContext } from 'react';
import { Form } from 'react-bootstrap';
import { ReviewFormContext } from './AddReview.jsx'

const RecommendReview = () => {
  const { reviewForm, handleInputChange } = useContext(ReviewFormContext);
  const { recommend } = reviewForm;

  return (
    <div className="row">
      <Form.Label>Would you recommend this product? *</Form.Label>
      <Form.Group>
        <div className="form-check-inline">
          <Form.Label>
            Yes
          </Form.Label>
          <input
            type="radio"
            name="recommend"
            label="Yes"
            value={true}
            checked={recommend === 'true'}
            required
            onChange={e => handleInputChange(e)}></input>
        </div>
        <div className="form-check-inline">
          <Form.Label>
            No
          </Form.Label>
          <input
            type="radio"
            name="recommend"
            value={false}
            checked={recommend === 'false'}
            required
            onChange={e => handleInputChange(e)}></input>
        </div>
      </Form.Group>
    </div>
  )
}

export default RecommendReview;