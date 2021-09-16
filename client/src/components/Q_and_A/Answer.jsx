import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Answer = ({ answer }) => {
  const [ helpfulness, setHelpfulness ] = useState(null);
  const [ helpfulClick, setHelpfulClick ] = useState(false);

  useEffect(() => {
    setHelpfulness(answer.helpfulness)
  }, [])

  const increaseHelpful = () => {
    axios.put(`/api/QA/answers/${answer.id}/helpful`)
      .then(() => setHelpfulClick(true))
      .catch(error => console.error(error));
  }

  const renderPhotos = (photos) => {
    if (photos.length === 0) return;
    return (
      <span>
        {photos.map((photo, idx) => {
          return (
            <img key={idx} style={{ width: '50px' }} className='answer-photos' src={photo}></img>
          )
        })}
      </span>
    )
  }

  const readableDate = (date) => {
    return new Date(date).toLocaleDateString('en-us', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div key={answer.id} value={answer.id}>
      <div> {answer.body}</div>
      <div>{renderPhotos(answer.photos)}</div>
      <span>by {answer.answerer_name} {readableDate(answer.date)} | </span>
      { !helpfulClick
          ?<a className='btn btn-link'
            onClick={() => {
            setHelpfulness(helpfulness + 1);
            increaseHelpful()} }
            >Helpful?
          </a>
          :<span>Helpful?</span>}
      <span>Yes</span><span>[{helpfulness}] | </span>
      <span>Report</span>
    </div>
  )
}

export default Answer;