import React, {useState, useEffect } from 'react';
import axios from 'axios';
import RelatedEntry from './relatedEntry.jsx';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const RelatedList = function({prodId, setCurrentProd}) {

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
    getRelatedInfo()
  }, [relatedIDs])

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  // const handleClick = () => {
  //   console.log('product function hit');
  //   setCurrentProd(product.id);
  // }

  function CardDisplay() {
    return (
      <Carousel responsive={responsive}>
        {relatedInfo.map((product) => {
          return (
            <a style={{ cursor: 'pointer' }} onClick={() => setCurrentProd(product.id)}>
              <RelatedEntry product={product} key={product.id} photo={relatedPhotos[product.id]} setCurrentProd={setCurrentProd}/>
            </a>
          )
        })
        }
     </Carousel>
    )
  }

  return (
    <div>
      <CardDisplay />
    </div>
  )
}
export default RelatedList;
