import React, {useState, useEffect } from 'react';
import axios from 'axios';

const relatedList = function({prodId}) {

  const [relatedIDs, setRelatedIDs] = useState([]);
  const [relatedInfo, setRelatedInfo] = useState([]);

  useEffect(() => {
    const getIDs = () => {
      axios.get(`/api/product/${prodId}/related`)
        .then(res => {
          setRelatedIDs(res.data)
        })
        .catch(err => {
          console.error(err);
        })
    }
  }, [prodId])

  useEffect(() => {
    const getRelatedInfo = () => {
      for (var i = 0; i < relatedIDs.length; i++) {
        axios.get(`/api/product/${relatedIDs[i]}`)
          .then(res => {
            setRelatedInfo(res.data);
          })
          .catch(err => {
            console.error(err);
          })
      }
    }
  }, [relatedIDs])

  return (
    <div className="relatedList">
      {related.map(product =>
        <relatedEntry product={product} key={product.id} />
      )}
   </div>
  )
}
export default related = relatedList;