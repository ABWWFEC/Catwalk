import React, {useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';

const OutfitEntry = ({product, photo}) => (
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
)

export default OutfitEntry;