import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Collapse from 'react-bootstrap/Collapse';
import { FcCheckmark } from 'react-icons/fc';

const Review = ({ reviewData }) => {
  const [ photoClicked, setPhotoClicked ] = useState(false);
  const [ photoURL, setPhotoURL ] = useState('');
  const [ readMore, setReadMore ] = useState(false);
  const [ yesClicked, setYesClicked ] = useState(false);
  const [ reportClicked, setReportClicked ] = useState(false);
  const { date, rating, reviewer_name, summary, body, recommend, response, helpfulness, review_id, photos } = reviewData;
  const readableDate = new Date(date).toLocaleDateString(
    'en-us',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
  );

  const handleYesClick = () => {
    axios.put(`/api/reviews/${review_id}/helpful`)
      .then(() => {
        setYesClicked(true);
        console.log(`Marked review as helpful! :)`)
      })
      .catch((err) => console.log(`Couldn't mark review as helpful :(`, err));
  }

  const handleReportClick = () => {
    axios.put(`/api/reviews/${review_id}/report`)
      .then(() => {
        setReportClicked(true);
        console.log(`Reported review! :)`)
      })
      .catch((err) => console.log(`Couldn't report the review :(`, err));
  }

  const handlePhotoClick = (e) => {
    setPhotoClicked(true);
    setPhotoURL(e.target.src);
  }

  const handlePhotoModalClose = () => {
    setPhotoClicked(false);
  }

  return (
    <div className="row mt-2">
      <div className="row">
        <div className="col-auto me-auto">star rating {rating}</div>
        <div className="col-auto text-end">{reviewer_name}, {readableDate}</div>
      </div>
      <div className="fw-bold mt-1">{summary}</div>
      {body.length <= 250 && <div className="text-wrap">{body}</div>}
      {body.length > 250 &&
        <div style={{width: '100%'}}>
          <p className="review-body">{body.slice(0, 250)}...</p>
          <Collapse in={readMore}>
            <p className="review-body">...{body.slice(250)}</p>
          </Collapse>
          <button className="btn btn-outline-dark" onClick={() => setReadMore(!readMore)}>Show more</button>
        </div>}
      {photos.length > 0 && photos.map((photo, index) => {
        return (
          <div className="row mt-1">
            <div className="col-2" key={photo.id}>
              <img src={photo.url} onClick={handlePhotoClick}></img>
            </div>
          </div>
        )
      })}
      {recommend && <div className="row align-items-center mt-1">
        <div className="col-auto"><FcCheckmark style={{transform: 'translateY(-10%)'}} size={'1.25em'}/></div>
        <div className="col" style={{'paddingLeft': '0px'}}>I recommend this product</div>
      </div>}
      {response && <div className="mt-1 seller-response">{response}</div>}
      <div className="row mt-1 fw-light">
        <div className="col-auto">
          Helpful? <span
            className="text-decoration-underline"
            style={{cursor: 'pointer'}}
            onClick={handleYesClick}>Yes</span>({helpfulness}) | <span
              className="text-decoration-underline"
              style={{cursor: 'pointer'}}
              onClick={handleReportClick}>Report</span>
        </div>
        {yesClicked && <div className="col helpful-yes">Sent as helpful!</div>}
        {reportClicked && <div className="col helpful-report">Reported!</div>}
      </div>
      <Modal show={photoClicked} onHide={handlePhotoModalClose}>
        <Modal.Header>
          <button type="button" className="btn-close" aria-label="Close" onClick={handlePhotoModalClose}></button>
        </Modal.Header>
        <Modal.Body>
          <img src={photoURL}></img>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default Review;