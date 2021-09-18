import React, { useContext } from 'react';
import { ReviewFormContext } from './AddReview.jsx';

const CharacteristicReview = ({ characteristicName, characteristicDescriptors, characteristicId }) => {
  const { handleInputChange } = useContext(ReviewFormContext);

  return (
    <div>
      <div>
        {[...Array(5)].map((rating, index) => {
            index += 1;
            return (
              <input
                type="radio"
                key={index}
                value={index}
                name={characteristicId}
                data-characteristic-name={characteristicName}
                onChange={e => handleInputChange(e)}/>
              )
            })}
      </div>
      <div>
        {characteristicDescriptors.map((descriptor, index) => <span key={index}>{descriptor}</span>)}
      </div>
    </div>
  )
}

export default CharacteristicReview;