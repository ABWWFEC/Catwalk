import React from 'react';
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
    <div>
      {characteristicTags.map(characteristic => (
        characteristics[characteristic].id !== 0
          && <CharacteristicReview
            key={characteristics[characteristic].id}
            characteristicName={characteristic}
            characteristicId={characteristics[characteristic].id}
            characteristicDescriptors={characteristicsDescriptors[characteristic]} />
      ))}
    </div>
  )
}

export default CharacteristicsReviewList;