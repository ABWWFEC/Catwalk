import React, {useState, useEffect } from 'react';

const RelatedEntry = ({product, photo}) =>  (
    <div className='relatedEntry'>
      <img src={`${photo}`} width="60" height="100"></img>
      <div>
       {product.category}
      </div>
      <div>
       {product.name}
      </div>
      <div>
        ${product.price}
      </div>
    </div>
)

export default RelatedEntry;