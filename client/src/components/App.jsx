import React, { useState } from 'react';

import Overview from './overview/Overview.jsx';
import QandA from './Q_and_A/Q_and_A.jsx';
import Reviews from './Rating_and_Reviews/Rating_and_Reviews.jsx';
import RelatedList from './Related_and_Outfit/RelatedList.jsx';
import OutfitList from './Related_and_Outfit/OutfitList.jsx';
import NavBar from './NavBar.jsx';


const App = () => {
  const [prodId, setProdId] = useState(42370);
  const [viewMode, setViewMode] = useState(true)

  return (
    <div>
      <NavBar viewMode={ viewMode } setViewMode={ setViewMode }/>
      <Overview prodId={ prodId } />
      <QandA prodId={ prodId } viewMode={ viewMode }/>
      <Reviews prodId={prodId} />
      <RelatedList prodId={prodId} setProdId={setProdId}/>
      <OutfitList prodId={prodId} />
    </div>
  );
};

export default App;