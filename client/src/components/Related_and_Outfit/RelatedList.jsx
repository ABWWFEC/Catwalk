import React, {useState, useEffect } from 'react';
import axios from 'axios';
import RelatedEntry from './relatedEntry.jsx';

const relatedList = function({prodId}) {

  const [relatedIDs, setRelatedIDs] = useState([]);
  const [relatedInfo, setRelatedInfo] = useState([]);
  const [relatedPhotos, setRelatedPhotos] = useState({});

  useEffect(() => {
    const getIDs = () => {
      axios.get(`/api/product/${prodId}/related`)
        .then(res => {
          setRelatedIDs(res.data);
        })
        .catch(err => {
          console.error(err);
        })
    }
    getIDs();
  }, [prodId])

  useEffect(() => {
    const getRelatedInfo = () => {
      for (var i = 0; i < relatedIDs.length; i++) {
        axios.get(`/api/product/${relatedIDs[i]}`)
          .then(res => {
            setRelatedInfo(prevRelatedInfo => ([...prevRelatedInfo, {
              id: res.data.id,
              category: res.data.category,
              price: res.data.default_price,
              features: res.data.features,
              name: res.data.name
            }]));
          })
          .catch(err => {
            console.error('uh oh', err);
          })
      }
    }
    getRelatedInfo()
  }, [relatedIDs])

  useEffect(() => {
    console.log('The related info is: ', relatedInfo);
  }, [relatedInfo])

  useEffect(() => {
    const getRelatedPhotos = () => {
      for (var i = 0; i < relatedIDs.length; i++) {
        axios.get(`/api/product/${relatedIDs[i]}/styles`)
          .then(res => {
            setRelatedPhotos(prevRelatedPhotos => ({...prevRelatedPhotos,
              [res.data.product_id]: res.data.results[0].photos[0].thumbnail_url
            }))
          })
      }
    }
    getRelatedPhotos()
  }, [relatedIDs])

  useEffect(() => {
    console.log('related photo link objects: ', relatedPhotos);
  }, [relatedPhotos])

  const entry = relatedInfo.map((product, index) => {
    const currentPhoto = relatedPhotos[product.id];
    return(
      <RelatedEntry product={product} key={product.id} photo={currentPhoto}/>
    );
  });

  return (
    <div className="relatedList">
      {entry}
    </div>
  )
}
export default relatedList;