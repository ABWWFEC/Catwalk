import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Cart from './Cart.jsx';
import Style from './Style.jsx';

const Overview = ({prodId}) => {
  const [prodInfo, setProdInfo] = useState({});
  const [prodStyle, setProdStyle] = useState([]);
  const [selStyle, setSelStyle] = useState({skus:{}});

  useEffect(() => {
    const getInfo = () => {
      axios.get(`/api/product/${prodId}`)
        .then(res => {
          setProdInfo(res.data);
        })
        .catch(err => {
          console.error(err);
        })
    }
    getInfo();
  }, [prodId]);

  useEffect(() => {
    const getStyle = () => {
      axios.get(`/api/product/${prodId}/styles`)
        .then(res => {
          setProdStyle(res.data.results);
          setSelStyle(res.data.results[0]);
        })
        .catch(err => {
          console.error(err);
        })
    }
    getStyle();
  }, [prodId]);

  return (
    <div className='Overview'>
      <div className='images'>
      {console.log(prodStyle)}
      </div>
      <div className='info'>
        <div className='rating'>
          <div className='rate star'></div>
          <div className='all review'></div>
        </div>
        <div className='category'>{prodInfo.category}</div>
        <h1 className='title'>{prodInfo.name}</h1>
        <h1 className='price'>{`$ ${selStyle.original_price}`}</h1>
        <h1 className='selected style'>{`STYLE > ${selStyle.name}`}</h1>
        <div className='style seletcer'>
          <Style styles={prodStyle} setStyle={setSelStyle}/>
        </div>
        <div className='cart'>
          <Cart style={selStyle} prodId={prodId}/>
        </div>

      </div>
    </div>
  )
}

export default Overview;

