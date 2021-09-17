import React, {useState, useEffect } from 'react';
import { Card, Carousel } from 'react-bootstrap';

const RelatedEntry = ({product, photo}) =>  (
  <Carousel.item>
    <Card style={{ width: '18rem' }}>
    <Card.Img variant="top" src={`${photo}`} />
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
  </Carousel.item>
)

export default RelatedEntry;