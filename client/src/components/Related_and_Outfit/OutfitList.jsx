import React, {useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
//import OutfitEntry from './OutfitEntry.jsx';

const OutfitList = function({prodId}) {
  return (
    <Card style={{ width: '18rem' }}>
    <Card.Body>
      <Card.Title>
        +
      </Card.Title>
      <Card.Text>
       Add Current Item To Outfit
      </Card.Text>
    </Card.Body>
    </Card>
  )
}

export default OutfitList;