import React, { useContext } from 'react';
import { ReviewFormContext } from './AddReview.jsx';

const CharacteristicReview = ({ characteristicName, characteristicDescriptors, characteristicId }) => {
  const { reviewForm, handleInputChange } = useContext(ReviewFormContext);
  const { characteristics } = reviewForm;

  return (
    <div>
      <div className="row">
        {[...Array(5)].map((rating, index) => {
            index += 1;
            return (
              <input
                className="col"
                type="radio"
                key={index}
                checked={characteristics[characteristicId] === index}
                value={index}
                name={characteristicId}
                data-characteristic-name={characteristicName}
                onChange={e => handleInputChange(e)}/>
              )
            })}
      </div>
      <div className="row">
        {characteristicDescriptors.map((descriptor, index) => <div className="col text-center" key={index}>{descriptor}</div>)}
      </div>
    </div>
  )
}

export default CharacteristicReview;