import React, { useState } from 'react';
import Related from './related/Related_Prods.jsx';

const App = () => {
  const [prodId, setProdId] = useState(42366);

  return (
    <div>
      <h1>hello</h1>
      <Overview prodId={prodId} />
      <Related prodId={prodId} setProdId={setProdId} />
      <QandA prodId={prodId} />
      <Reviews prodId={prodId} />
    </div>
  )
};

export default App;
