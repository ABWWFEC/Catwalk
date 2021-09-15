import React from 'react';
import Characteristic from './Characteristic.jsx';

const CharacteristicsBreakdown = ({ characteristics }) => {
  let characteristicsTag = Object.keys(characteristics);

  return (
    <div>{characteristicsTag.map(characteristic => (
      characteristics[characteristic].id
      && <Characteristic
        key={characteristics[characteristic].id}
        characteristicName={characteristic}
        characteristicValue={characteristics[characteristic].value} />
    ))}</div>
  )
}

export default CharacteristicsBreakdown;