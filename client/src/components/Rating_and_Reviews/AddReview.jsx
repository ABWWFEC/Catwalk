import React, { useState, useContext, createContext } from 'react';
import axios from 'axios';
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
    characteristicsById[characteristics[characteristic].id] = characteristics[characteristic].value;
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
    e.preventDefault();

    axios.post(`/api/reviews/${product_id}`, {
      ...reviewForm,
      recommend: recommend === 'true'
    })
      .then(() => {
        setReviewForm({
          name: '',
          email: '',
          summary: '',
          body: '',
          rating: 0,
          photos: [],
          characteristics: characteristicsById,
          recommend: false
        })
        console.log('Added review successfully! :)');
      })
      .catch((err) => console.log(`Couldn't add the review :(`, err))
      .then(() => handleAddReviewClose());
  }

  const providerValue = {
    ...reviewForm,
    handleInputChange
  }

  return (
    <ReviewFormContext.Provider value={providerValue}>
      <form className="row">
        <StarRatingReview />
        <RecommendReview />
        <CharacteristicsReviewList characteristics={characteristics} />
        <div className="row">
          <div>Review Summary</div>
          <input type="text"
            name="summary"
            value={summary}
            placeholder="Example: Best purchase ever!"
            onChange={e => handleInputChange(e)}></input>
        </div>
        <div className="row">
          <div>Tell us what you thought!</div>
          <textarea
            name="body"
            value={body}
            placeholder="Why did you like this product or not?"
            onChange={e => handleInputChange(e)}></textarea>
        </div>
        {photos.length > 1 &&
          <div className="row">
            {photos.map((photo, index) => <img key={index} src={photo}></img>)}
          </div>}
        {photos.length < 5 &&
          <div className="row">
            <input
              type="file"
              multiple
              name="photos"
              onChange={e => handleInputChange(e)}></input>
          </div>}
        <div className="row">
          <div>Username</div>
          <input
            type="text"
            name="name"
            value={name}
            onChange={e => handleInputChange(e)}></input>
          <div>For privacy reasons, do not use your full name or e-mail address</div>
        </div>
        <div className="row">
          <div>E-mail</div>
          <input
            type="email"
            name="email"
            value={email}
            onChange={e => handleInputChange(e)}></input>
          <div>For authentication reasons, you will not be emailed</div>
        </div>
        <div className="row justify-content-end">
          <div>
            <button onClick={handleReviewFormSubmit}>Submit!</button>
          </div>
        </div>
      </form>
    </ReviewFormContext.Provider>
  )
}

export default AddReview;