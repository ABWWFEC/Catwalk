import React, { useContext } from 'react';
import CharacteristicReview from './CharacteristicReview.jsx';

const CharacteristicsReviewList = ({ characteristics }) => {
  const characteristicTags = Object.keys(characteristics);
  const characteristicsDescriptors = {
    Size: ['A size too small', `1/2 a size too small`, 'Perfect', `1/2 a size too big`, 'A size too wide'],
    Width: ['Too narrow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too wide'],
    Comfort: ['Uncomfortable', 'Slightly comfortable', 'Ok', 'Comfortable', 'Perfect'],
    Quality: ['Poor', 'Below average', 'What I expected', 'Pretty great', 'Perfect'],
    Length: ['Runs short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long'],
    Fit: ['Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly long', 'Runs long']
  }

  return (
    <div className="row">
      <div>Rate the characteristics of this product!</div>
      <div>
        {characteristicTags.map(characteristic => (
          characteristics[characteristic].id
            && <CharacteristicReview
              key={characteristics[characteristic].id}
              characteristicName={characteristic}
              characteristicId={characteristics[characteristic].id}
              characteristicDescriptors={characteristicsDescriptors[characteristic]} />
        ))}
      </div>
    </div>
  )
}

export default CharacteristicsReviewList;