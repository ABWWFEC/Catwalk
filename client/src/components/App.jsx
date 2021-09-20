import React, { useState } from 'react';
import Overview from './Overview.jsx';
import QandA from './Q_and_A.jsx';
import Related from './Related_Prods.jsx';
import Reviews from './Rating_and_Reviews.jsx';

const App = () => {
  const [prodId, setProdId] = useState(42370);

  return (
    <div>
      <h1>hello</h1>
      <Overview prodId={prodId} />
      <Related prodId={prodId} setProdId={setProdId} />
      <QandA prodId={prodId} />
      <Reviews prodId={prodId} />
    </div>
  );
};

export default App;