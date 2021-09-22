import React, { useState, useEffect} from 'react';
import axios from 'axios';

import Overview from './overview/Overview.jsx';
import QandA from './Q_and_A/Q_and_A.jsx';
import Reviews from './Rating_and_Reviews/Rating_and_Reviews.jsx';
import RelatedList from './Related_and_Outfit/RelatedList.jsx';
import OutfitList from './Related_and_Outfit/OutfitList.jsx';


const App = () => {
  const [prodId, setProdId] = useState(42370);
  const [prodInfo, setProdInfo] = useState({id:prodId});

  useEffect(() => {
    const getInfo = () => {
      axios.get(`/api/product/${prodId}`)
        .then(res => {
          setProdInfo(res.data);
        })
        .catch(err => {
          // console.error(err);
        })
    }
    getInfo();
  }, [prodId]);

  return (
    <div>
      <Overview prodInfo={prodInfo} />
      <QandA
        prodId={ prodId }
        prodInfo={ prodInfo }
        setProdInfo={ setProdInfo }/>
      <Reviews prodId={prodId} />

      <RelatedList prodId={prodId} setProdId={setProdId}/>
      <OutfitList prodId={prodId} />
    </div>
  );
};

export default App;