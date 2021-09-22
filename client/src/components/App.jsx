import React, { useState } from 'react';

import Overview from './overview/Overview.jsx';
import QandA from './Q_and_A/Q_and_A.jsx';
import Reviews from './Rating_and_Reviews/Rating_and_Reviews.jsx';
import RelatedList from './Related_and_Outfit/RelatedList.jsx';
import OutfitList from './Related_and_Outfit/OutfitList.jsx';


const App = () => {
  const [prodId, setProdId] = useState(42370);

  return (
    <div>
      <Overview prodId={prodId} />
      <QandA prodId={prodId} />
      <Reviews prodId={prodId} />

      <RelatedList prodId={prodId} setProdId={setProdId}/>
      <OutfitList prodId={prodId} />
    </div>
  );
};

export default App;