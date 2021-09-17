import React, {useState, useEffect } from 'react';
import { Card, Carousel } from 'react-bootstrap';
import '../../../dist/style.css';

const RelatedEntry = ({product, photo}) =>  (
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
    </Card.Body>
  </Card>
)

export default RelatedEntry;