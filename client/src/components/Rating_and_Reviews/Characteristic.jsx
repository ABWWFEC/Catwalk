import React from 'react';

const Characteristic =  ({ characteristicName, characteristicValue }) => {

  const descriptors = (name) => {
    if (name === 'Fit') {
      return (
        <div>
          <div>Too tight</div>
          <div>Too loose</div>
        </div>
      )
    }

    if (name === 'Length') {
      return (
        <div>
          <div>Runs short</div>
          <div>Runs long</div>
        </div>
      )
    }

    if (name === 'Comfort') {
      return (
        <div>
          <div>Uncomfortable</div>
          <div>Perfect</div>
        </div>
      )
    }
    if (name === 'Quality') {
      return (
        <div>
          <div>Poor</div>
          <div>Perfect</div>
        </div>
      )
    }

    if (name === 'Width') {
      return (
        <div>
          <div>Too narrow</div>
          <div>Too wide</div>
        </div>
      )
    }

    if (name ==='Size') {
      return (
        <div>
          <div>Too small</div>
          <div>Too large</div>
        </div>
      )
    }
  }

  return (
    <div>
      <div>{characteristicName}</div>
      <div>{Number(characteristicValue).toPrecision(3)} bar</div>
      {descriptors(characteristicName)}
    </div>
  )
}

export default Characteristic;