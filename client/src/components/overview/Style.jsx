import React from 'react';

const Style = ({styles, setStyle}) => {

  return (
    <div>
      {styles.map((style, index) => {
        return (
          <img src={style.photos[0].thumbnail_url} id={index} onClick={e => setStyle(styles[e.target.id])} key={index} />
        )
      })}
    </div>
  )
}

export default Style;