import React, { useEffect } from 'react';
import axios from 'axios';

const relatedList = ({relatedProds}) => {
  const getRelated = (prodId) => {
    var data = '';

    var config = {
      method: 'get',
      url: `127.0.0.1:3000/api/product/${prodId}/related`,
      headers: {},
      data : data
    };

    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
  }


  const [related, setRelated] = useState([]);

  useEffect(() => {

  }, [])

  return (
    <div className="relatedList">
      {relatedProds.map(product =>
        <relatedEntry product={product} key={product.id} />
      )}
   </div>
  )
}
export default related = relatedList;