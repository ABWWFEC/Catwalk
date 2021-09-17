import React, {useState, useEffect } from 'react';
import axios from 'axios';
import RelatedEntry from './relatedEntry.jsx';
import { Carousel } from 'react-bootstrap';

const RelatedList = function({prodId}) {

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
    const getRelatedPhotos = () => {
      for (var i = 0; i < relatedIDs.length; i++) {
        axios.get(`/api/product/${relatedIDs[i]}/styles`)
          .then(res => {
            if (res.data.results[0].photos[0].thumbnail_url !== null) {
              setRelatedPhotos(prevRelatedPhotos => ({...prevRelatedPhotos,
                [res.data.product_id]: res.data.results[0].photos[0].thumbnail_url
              }))
            } else {
              setRelatedPhotos(prevRelatedPhotos => ({...prevRelatedPhotos,
                [res.data.product_id]: "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"
              }))
            }
          })
      }
    }
    getRelatedPhotos()
  }, [relatedIDs])

  return (
    <Carousel>
      {relatedInfo.map((product) => {
        return <RelatedEntry product={product} key={product.id} photo={relatedPhotos[product.id]}/>
        })
      }
    </Carousel>
  )
}
export default RelatedList;
