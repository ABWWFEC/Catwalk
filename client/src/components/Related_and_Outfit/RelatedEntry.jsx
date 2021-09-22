import React, {useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';

const RelatedEntry = ({product, photo, id, rating, handleClick, setProdId}) =>  {

  return (
    <Card style={{width: '10rem', flex: 1}}>
       <Card.Img variant="top" src={`${photo}`} style={{width: '10rem', height: '15vw', objectFit: 'cover'}}/>
      <Card.Body>
        <Card.Title>
          {product.name}
        </Card.Title>
        <Card.Text>
          {product.category}
        </Card.Text>
        <Card.Text>
          ${product.price}
        </Card.Text>
        <Card.Text>
          Rating: {rating}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}
export default RelatedEntry;