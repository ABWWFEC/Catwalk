import React, { useState, useContext, createContext } from 'react';
import axios from 'axios';
import validator from 'email-validator';
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
  const [ errors, setErrors ] = useState({
    name: false,
    email: false,
    summary: false,
    bodyTooShort: false,
    bodyTooLong: false,
    rating: false,
    characteristics: false,
    recommend: false
  })
  const [ valid, setValid ] = useState(false);
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

  const checkError = () => {
    if (name.length > 60) {
      setErrors(prevErrors => ({...prevErrors, name: true}));
    }

    if (!validator.validate(email)) {
      setErrors(prevErrors =>({...prevErrors, email: true}));
    }

    if (summary.length > 60) {
      setErrors(prevErrors =>({...prevErrors, summary: true}));
    }

    if (body.length < 50) {
      setErrors(prevErrors =>({...prevErrors, bodyTooShort: true}));
    }

    if (body.length > 1000) {
      setErrors(prevErrors =>({...prevErrors, bodyTooLong: true}));
    }

    if (rating === 0) {
      setErrors(prevErrors =>({...prevErrors, rating: true}));
    }

    if (typeof(recommend) === 'boolean') {
      setErrors(prevErrors =>({...prevErrors, recommend: true}));
    }

    for (const id in reviewForm.characteristics) {
      if (reviewForm.characteristics[id] === 0) {
        setErrors(prevErrors =>({...prevErrors, characteristics: true}));
      }
    }
  }

  const handleValidation = () => {
    checkError();
    for (const error in errors) {
      if (errors[error]) {
        console.log('error message');
        setValid(false);
        console.log(valid);
        return;
      }
    }
    setValid(true);
  }

  const handleReviewFormSubmit = (e) => {
    e.preventDefault();
    if (valid) {
      console.log('hello', valid);
    } else {
      console.log('poop', valid)
    }
    // if (valid) {
    //   axios.post(`/api/reviews/${product_id}`, {
    //     ...reviewForm,
    //     recommend: recommend === 'true'
    //   })
    //     .catch((err) => console.log(`Couldn't add the review :(`, err))
    //     .then(() => handleAddReviewClose());
    // }
  }

  const providerValue = {
    reviewForm,
    errors,
    handleInputChange
  }

  return (
    <ReviewFormContext.Provider value={providerValue}>
      <form className="row" onSubmit={handleReviewFormSubmit}>
        <div className="row">
          {}
          <div className="col text-end">* indicates a required field</div>
        </div>
        <StarRatingReview />
        <RecommendReview />
        <CharacteristicsReviewList characteristics={characteristics} />
        <div className="row">
          <div className="h6">Review Summary</div>
          <input type="text"
            name="summary"
            value={summary}
            placeholder="Example: Best purchase ever!"
            onChange={e => handleInputChange(e)}></input>
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
          <div className="h6">Username *</div>
          <input
            type="text"
            name="name"
            value={name}
            onChange={e => handleInputChange(e)}></input>
          <div className="fs-6 font-weight-light text-muted">For privacy reasons, do not use your full name or e-mail address</div>
        </div>
        <div className="row">
          <div className="h6">E-mail *</div>
          <input
            type="email"
            name="email"
            value={email}
            onChange={e => handleInputChange(e)}></input>
          <div className="fs-6 font-weight-light text-muted">For authentication reasons, you will not be emailed</div>
        </div>
        <div className="row justify-content-end">
          <div>
            <button className="btn btn-outline-dark" onClick={handleValidation}>Submit!</button>
          </div>
        </div>
      </form>
    </ReviewFormContext.Provider>
  )
}

export default AddReview;