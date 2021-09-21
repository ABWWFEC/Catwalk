import React, {useState, useEffect } from 'react';
import axios from 'axios';
import RelatedEntry from './relatedEntry.jsx';
import Carousel from 'react-multi-carousel';
import { Card } from 'react-bootstrap';
import 'react-multi-carousel/lib/styles.css';

const RelatedList = function({prodId, setProdId}) {

  const [relatedIDs, setRelatedIDs] = useState([]);
  const [relatedInfo, setRelatedInfo] = useState([]);
  const [relatedPhotos, setRelatedPhotos] = useState({});
  const [relatedRatings, setRelatedRatings] = useState({});

  const calculateAverage = (ratings) => {
    let sum = 0;
    let numberOfReviews = 0;
    for (var rating in ratings) {
      numberOfReviews += Number(ratings[rating])
      sum += rating * ratings[rating];
    }

    return (sum / numberOfReviews).toPrecision(2);
  }

  useEffect(() => {
    const getIDs = () => {
      axios.get(`/api/product/${prodId}/related`)
        .then(res => {
          setRelatedInfo([]);
          setRelatedPhotos({});
          setRelatedRatings({});
          setRelatedIDs(res.data);
          getRelatedInfo();
          getRelatedPhotos();
          getRelatedRatings();
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
            console.error('Error in info fetch: ', err);
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
          .catch(err => {
            console.error('Error in photos fetch: ', err);
          })
      }
    }
    const getRelatedRatings = () => {
      for (var i = 0; i < relatedIDs.length; i++) {
        axios.get(`api/review/meta/${relatedIDs[i]}`)
          .then(res => {
            if(Object.keys(res.data.ratings).length !== 0){
              setRelatedRatings(prevRelatedRatings => ({...prevRelatedRatings, [res.data.product_id]: calculateAverage(res.data.ratings)}))
            } else {
              setRelatedRatings(prevRelatedRatings => ({...prevRelatedRatings, [res.data.product_id]: "No ratings"}))
            }
          })
          .catch(err => {
            console.error('Error in ratings fetch: ', err);
          })
      }
    }
    getRelatedPhotos()
    getRelatedInfo()
    getRelatedRatings()
  }, [relatedIDs.length])

  useEffect(() => {
    console.log('related ratings: ', relatedRatings);
  }, [relatedRatings])

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

  const handleClick = () => {
    console.log('compare click handled');
  }

  function CardDisplay() {
    return (
      <Carousel responsive={responsive}>
        {relatedInfo.map((product, index) => {
          return (
            <a style={{ cursor: 'pointer' }} onClick={() => setProdId(product.id)}>
              <RelatedEntry product={product} key={index} photo={relatedPhotos[product.id]} handleClick={handleClick}/>
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
