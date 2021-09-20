import React, {useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import '../../../dist/style.css';

const RelatedEntry = ({product, photo, setCurrentProd}) =>  {

  return (
    <div>
      <b-card
        title={product.name}
        img-src={`${photo}`}
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 20rem;"
        class="mb-2"
      >
        <b-card-text>
          {product.category}
        </b-card-text>
        <b-card-text>
          ${product.price}
        </b-card-text>
      </b-card>
   </div>
  )
}
export default RelatedEntry;