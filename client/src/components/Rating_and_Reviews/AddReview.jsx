import React, { useState, useContext, createContext } from 'react';
import axios from 'axios';
import validator from 'email-validator';
import { Form } from 'react-bootstrap';
import { ReviewsContext } from './Rating_and_Reviews.jsx';
import CharacteristicsReviewList from './CharacteristicsReviewList.jsx';
import StarRatingReview from './StarRatingReview.jsx';
import RecommendReview from './RecommendReview.jsx';

export const ReviewFormContext = createContext();

const AddReview = ({ product_id }) => {
  const { reviewsMetaData } = useContext(ReviewsContext);
  const { characteristics } = reviewsMetaData;
  const characteristicsById = {};

  for (const characteristic in characteristics) {
    characteristicsById[characteristics[characteristic].id] = 0;
  }

  const [ reviewForm, setReviewForm ] = useState({
    name: '',
    email: '',
    summary: '',
    body: '',
    rating: 0,
    photos: [],
    characteristics: characteristicsById,
    recommend: false
  });

  const [ validated, setValidated ] = useState(false);
  const { name, email, summary, body, photos, rating, recommend } = reviewForm;

  const handleInputChange = (e) => {
    const characteristicIds = Object.keys(characteristicsById);

    if (e.target.name === 'photos') {
      let photoURLs = [...e.target.files].map(file => URL.createObjectURL(file));

      setReviewForm(prevReviewForm => ({
        ...prevReviewForm,
        photos: [...prevReviewForm.photos, ...photoURLs]
      }))

      return;
    }

    if (characteristicIds.includes(e.target.name)) {
      setReviewForm(prevReviewForm => ({
        ...prevReviewForm,
        characteristics: {
          ...prevReviewForm.characteristics,
          [e.target.name]: Number(e.target.value)
        }
      }))

      return;
    }

    if (e.target.name === 'rating') {
      setReviewForm(prevReviewForm => ({
        ...prevReviewForm,
        rating: Number(e.target.value)
      }))

      return;
    }

    setReviewForm(prevReviewForm => ({
      ...prevReviewForm,
      [e.target.name]: e.target.value
    }))
  }

  const handleReviewFormSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      console.log(reviewForm);
      setValidated(true);
      return false;
    }

    e.preventDefault();
    setValidated(true);
  }

  const providerValue = {
    reviewForm,
    handleInputChange
  }

  return (
    <ReviewFormContext.Provider value={providerValue}>
      <Form validated={validated} noValidate onSubmit={handleReviewFormSubmit}>
        <div className="row">
          <div className="col text-end">* indicates a required field</div>
        </div>
        <StarRatingReview />
        <RecommendReview />
        <CharacteristicsReviewList characteristics={characteristics} />
        <div className="row">
          <Form.Group controlId="validateSummary">
            <Form.Label>Review Summary</Form.Label>
            <Form.Control
              type="text"
              name="summary"
              value={summary}
              placeholder="Example: Best purchase ever!"
              onChange={e => handleInputChange(e)}></Form.Control>
          </Form.Group>
        </div>
        <div className="row">
          <div className="h6">Review Body *</div>
          <div>Tell us what you thought!</div>
          <textarea
            name="body"
            value={body}
            placeholder="Why did you like this product or not?"
            onChange={e => handleInputChange(e)}></textarea>
          {body.length < 50 && <div>
            <p className="text-muted">Minimun required characters left: {50 - body.length}</p>
          </div>}
        </div>
        {photos.length > 0 &&
          <div className="row">
            {photos.map((photo, index) => <img key={index} src={photo}></img>)}
          </div>}
        {photos.length < 5 &&
          <div className="row">
            <input
              type="file"
              accept="image/*"
              multiple
              name="photos"
              onChange={e => handleInputChange(e)}></input>
          </div>}
        <div className="row">
          <Form.Group controlId="validateName">
            <Form.Label>Username *</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={name}
              required
              maxLength="60"
              onChange={e => handleInputChange(e)}></Form.Control>
            <Form.Control.Feedback type="invalid">
              Please provide a username.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Text muted>For privacy reasons, do not use your full name or e-mail address</Form.Text>
        </div>
        <div className="row">
          <Form.Group controlId="validateEmail">
            <Form.Label>E-mail *</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={email}
              required
              onChange={e => handleInputChange(e)}></Form.Control>
            <Form.Control.Feedback type="invalid">
              Please provide a valid email address.
            </Form.Control.Feedback>
            <Form.Text muted>For authentication reasons, you will not be emailed</Form.Text>
          </Form.Group>
        </div>
        <div className="row justify-content-end">
          <div>
            <button className="btn btn-outline-dark">Submit!</button>
          </div>
        </div>
      </Form>
    </ReviewFormContext.Provider>
  )
}

export default AddReview;