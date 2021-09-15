import React from 'react';

const Characteristic =  ({ characteristicName, characteristicValue }) => {

  const descriptors = (name) => {
    if (name === 'Fit') {
      return (
        <div>
          <div>fit descriptor 1</div>
          <div>fit descriptor 2</div>
        </div>
      )
    }

    if (name === 'Length') {
      return (
        <div>
          <div>length descriptor 1</div>
          <div>length descriptor 2</div>
        </div>
      )
    }

    if (name === 'Comfort') {
      return (
        <div>
          <div>comfort descriptor 1</div>
          <div>comfort descriptor 2</div>
        </div>
      )
    }
    if (name === 'Quality') {
      return (
        <div>
          <div>quality descriptor 1</div>
          <div>quality descriptor 2</div>
        </div>
      )
    }

    if (name === 'Width') {
      return (
        <div>
          <div>width descriptor 1</div>
          <div>width descriptor 2</div>
        </div>
      )
    }

    if (name ==='Size') {
      return (
        <div>
          <div>size descriptor 1</div>
          <div>size descriptor 2</div>
        </div>
      )
    }
  }

  console.log(characteristicName);

  return (
    <div>
      <div>{characteristicName}</div>
      <div>{characteristicValue} bar</div>
      {descriptors(characteristicName)}
    </div>
  )
}

export default Characteristic;