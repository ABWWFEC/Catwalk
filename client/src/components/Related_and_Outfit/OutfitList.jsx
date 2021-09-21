import React, {useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import axios from 'axios';
import OutfitEntry from './OutfitEntry.jsx';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const OutfitList = function({prodId}) {
  const [OutfitIDs, setOutfitIDs] = useState([]);
  const [OutfitInfo, setOutfitInfo] = useState([]);
  const [OutfitPhotos, setOutfitPhotos] = useState({});

  const handleClick = () => {
    if (!OutfitIDs.includes(prodId)) {
      console.log('new id for outfit click handled! with: ', prodId);
      setOutfitIDs([...OutfitIDs, prodId])
    }
  }

  useEffect(() => {
    const getOutfitInfo = () => {
      for (var i = OutfitIDs.length - 1; i < OutfitIDs.length; i++) {
        axios.get(`/api/product/${OutfitIDs[i]}`)
          .then(res => {
            setOutfitInfo(prevRelatedInfo => ([...prevRelatedInfo, {
              id: res.data.id,
              category: res.data.category,
              price: res.data.default_price,
              name: res.data.name
            }]));
          })
          .catch(err => {
            console.error('uh oh', err);
          })
      }
    }
    const getOutfitPhotos = () => {
      for (var i = 0; i < OutfitIDs.length; i++) {
        axios.get(`/api/product/${OutfitIDs[i]}/styles`)
          .then(res => {
            if (res.data.results[0].photos[0].thumbnail_url !== null) {
              setOutfitPhotos(prevOutfitPhotos => ({...prevOutfitPhotos,
                [res.data.product_id]: res.data.results[0].photos[0].thumbnail_url
              }))
            } else {
              setOutfitPhotos(prevOutfitPhotos => ({...prevOutfitPhotos,
                [res.data.product_id]: "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"
              }))
            }
          })
      }
    }
    getOutfitInfo();
    getOutfitPhotos();
  }, [OutfitIDs])

  useEffect(() => {
    console.log('outfit info: ', OutfitInfo);
  }, [OutfitInfo])

  const responsive = {
    superLargeDesktop: {
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

  function OutfitDisplay() {
    return (
      <Carousel responsive={responsive}>
        <a style={{ cursor: 'pointer' }} onClick={handleClick}>
          <Card style={{width: '10rem', flex: 1}}>
          <Card.Body>
            <Card.Title>
              +
            </Card.Title>
            <Card.Text>
            Add Current Item To Outfit
            </Card.Text>
          </Card.Body>
          </Card>
        </a>
        {OutfitInfo.map((product) => {
          return <OutfitEntry product={product} key={product.id} photo={OutfitPhotos[product.id]}/>
          })
        }
      </Carousel>
    )
  }

  return (
    <div>
      <OutfitDisplay />
    </div>
  )
}

export default OutfitList;