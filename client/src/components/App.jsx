import React, { useState } from 'react';
import Reviews from './Rating_and_Reviews';
import RelatedList from './Related_and_Outfit/RelatedList.jsx';
import OutfitList from './Related_and_Outfit/OutfitList.jsx';

const App = () => {
  const [prodId, setProdId] = useState(42366);

  return (
    <div>
      {/* <Overview prodId={prodId} />
      <Related prodId={prodId} setProdId={setProdId} />
      <QandA prodId={prodId} />
      <Reviews prodId={prodId} />*/}

      <RelatedList prodId={prodId} />
      <OutfitList prodId={prodId} />
    </div>
  );
};

export default App;
