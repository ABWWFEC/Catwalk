import React from 'react';
import { GoTriangleDown } from 'react-icons/go';

const Characteristic =  ({ characteristicName, characteristicValue }) => {

  const descriptors = (name) => {
    if (name === 'Fit') {
      return (
        <div className="row">
          <div className="col-sm-6 text-start">Runs tight</div>
          <div className="col-sm-6 text-end">Runs long</div>
        </div>
      )
    }

    if (name === 'Length') {
      return (
        <div className="row">
          <div className="col-sm-6 text-start">Runs short</div>
          <div className="col-sm-6 text-end">Runs long</div>
        </div>
      )
    }

    if (name === 'Comfort') {
      return (
        <div className="row">
          <div className="col-sm-6 text-start">Uncomfortable</div>
          <div className="col-sm-6 text-end">Perfect</div>
        </div>
      )
    }
    if (name === 'Quality') {
      return (
        <div className="row">
          <div className="col-sm-6 text-start">Poor</div>
          <div className="col-sm-6 text-end">Perfect</div>
        </div>
      )
    }

    if (name === 'Width') {
      return (
        <div className="row">
          <div className="col-sm-6 text-start">Too narrow</div>
          <div className="col-sm-6 text-end">Too wide</div>
        </div>
      )
    }

    if (name ==='Size') {
      return (
        <div className="row">
          <div className="col-sm-6 text-start">A size too small</div>
          <div className="col-sm-6 text-end">A size too wide</div>
        </div>
      )
    }
  }

  return (
    <div>
      <div className="row">
        <div>{characteristicName}</div>
      </div>
      <div className="characteristic-rating row align-items-start" style={{height: '10px'}}>
        <GoTriangleDown className="col-auto" style={{transform: `translate(${Number(characteristicValue).toPrecision(3) * 100}%)`}}/>
      </div>
      {descriptors(characteristicName)}
    </div>
  )
}

export default Characteristic;