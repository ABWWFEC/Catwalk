import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';

const Review = ({ reviewData }) => {
  const [ photoClicked, setPhotoClicked ] = useState(false);
  const [ photoURL, setPhotoURL ] = useState('');
  const [ readMore, setReadMore ] = useState(false);
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
    axios.put(`/api/reviews/${review_id}`)
      .then(() => console.log(`Marked review as helpful! :)`))
      .catch((err) => console.log(`Couldn't mark review as helpful :(`, err));
  }

  const handleReportClick = () => {
    axios.put(`/api/reviews/${review_id}`)
      .then(() => console.log(`Reported review! :)`))
      .catch((err) => console.log(`Couldn't report the review :(`, err));
  }

  const handlePhotoClick = (e) => {
    setPhotoClicked(true);
    setPhotoURL(e.target.src);
  }

  const handlePhotoModalClose = () => {
    setPhotoClicked(false);
  }

  const renderBody = () => {

  }

  return (
    <div>
      <div className="row">
        <div className="col">star rating {rating}</div>
        <div className="col text-end">{reviewer_name}, {readableDate}</div>
      </div>
      <div className="font-weight-bold">{summary}</div>
      <div>{body}</div>
      <div>
        {photos.length > 0 && photos.map((photo, index) => {
          return (
            <div key={photo.id}>
              <img src={photo.url} onClick={handlePhotoClick}></img>
            </div>
          )
        })}
      </div>
      {recommend && <div>checkmark I recommend this product</div>}
      {response && <div>{response}</div>}
      <div>
        Helpful? <span>Yes</span>({helpfulness}) | <span>Report</span>
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