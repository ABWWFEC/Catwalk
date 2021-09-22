import React from 'react';

const Characteristic =  ({ characteristicName, characteristicValue }) => {

  const descriptors = (name) => {
    if (name === 'Fit') {
      return (
        <div className="row">
          <div className="col-sm-6">Runs tight</div>
          <div className="col-sm-6">Runs long</div>
        </div>
      )
    }

    if (name === 'Length') {
      return (
        <div className="row">
          <div className="col-sm-6">Runs short</div>
          <div className="col-sm-6">Runs long</div>
        </div>
      )
    }

    if (name === 'Comfort') {
      return (
        <div className="row">
          <div className="col-sm-6">Uncomfortable</div>
          <div className="col-sm-6">Perfect</div>
        </div>
      )
    }
    if (name === 'Quality') {
      return (
        <div className="row">
          <div className="col-sm-6">Poor</div>
          <div className="col-sm-6">Perfect</div>
        </div>
      )
    }

    if (name === 'Width') {
      return (
        <div className="row">
          <div className="col-sm-6">Too narrow</div>
          <div className="col-sm-6">Too wide</div>
        </div>
      )
    }

    if (name ==='Size') {
      return (
        <div className="row">
          <div className="col-sm-6">A size too small</div>
          <div className="col-sm-6">A size too wide</div>
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