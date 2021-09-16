import React from 'react';
import Characteristic from './Characteristic.jsx';

const CharacteristicsBreakdown = ({ characteristics }) => {
  let characteristicTags = Object.keys(characteristics);

  return (
    <div>
      {characteristicTags.map(characteristic => (
        characteristics[characteristic].id !== 0
        && <Characteristic
          key={characteristics[characteristic].id}
          characteristicName={characteristic}
          characteristicValue={characteristics[characteristic].value} />
      ))}
    </div>
  )
}

export default CharacteristicsBreakdown;