import React, { useState, useContext, createContext } from 'react';
import axios from 'axios';
import { ReviewsContext } from './Rating_and_Reviews.jsx';
import CharacteristicsReviewList from './CharacteristicsReviewList.jsx';

export const ReviewFormContext = createContext();

const AddReview = ({ product_id }) => {
  const { reviewsMetaData } = useContext(ReviewsContext);
  const { characteristics } = reviewsMetaData;
  const characteristicTags = Object.keys(characteristics);
  const [ reviewForm, setReviewForm ] = useState({
    name: '',
    email: '',
    summary: '',
    body: '',
    rating: 0,
    photos: [],
    characteristics: characteristics
  });
  const [ recommend, setRecommend ] = useState(false);
  const { name, email, summary, body, photos } = reviewForm;

  const handleInputChange = (e) => {
    if (e.target.name === 'photos') {
      let photoURLs = [...e.target.files].map(file => URL.createObjectURL(file));

      setReviewForm(prevReviewForm => ({
        ...prevReviewForm,
        photos: [...prevReviewForm.photos, ...photoURLs]
      }))

      return;
    }

    if (characteristicTags.includes(e.target.name)) {
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

  const handleRecommendChange = (e) => {
    e.target.value === 'true' ? setRecommend(true) : setRecommend(false);
  }

  const handleReviewFormSubmit = (e) => {
    e.preventDefault();

    axios.post(`/api/reviews/${product_id}`, {
      ...reviewForm,
      recommend
    })
  }

  console.log(`/api/reviews/${product_id}`);

  const providerValue = {
    handleInputChange
  }

  return (
    <form>
      <ReviewFormContext.Provider value={providerValue}>
        <div>
          <div>Rate this product!</div>
          {[...Array(5)].map((rating, index) => {
            index += 1;
            return (
              <input type="radio" key={index} value={index} name="rating" onChange={e => handleInputChange(e)}/>
            )
          })}
          <label>Some descriptor</label>
        </div>
        <div>
          <div>Would you recommend this product?</div>
          <label>Yes</label>
          <input type="radio" name="recommend" value={true} onChange={e => handleRecommendChange(e)}></input>
          <label>No</label>
          <input type="radio" name="recommend" value={false} onChange={e => handleRecommendChange(e)}></input>
        </div>
        <div>
          <div>Rate the characteristics of this product!</div>
          <CharacteristicsReviewList characteristics={characteristics} />
        </div>
        <div>
          <div>Review Summary</div>
          <input type="text" name="summary" value={summary} placeholder="Example: Best purchase ever!" onChange={e => handleInputChange(e)}></input>
        </div>
        <div>
          <div>Tell us what you thought!</div>
          <textarea name="body" value={body} placeholder="Why did you like this product or not?" onChange={e => handleInputChange(e)}></textarea>
        </div>
        {photos.length > 1 &&
          <div>
            {photos.map((photo, index) => <img key={index} src={photo}></img>)}
          </div>}
        {photos.length < 5 &&
          <div>
            <input type="file" multiple name="photos" onChange={e => handleInputChange(e)}></input>
          </div>}
        <div>
          <div>Username</div>
          <input type="text" name="name" value={name} onChange={e => handleInputChange(e)}></input>
          <div>For privacy reasons, do not use your full name or e-mail address</div>
        </div>
        <div>
          <div>E-mail</div>
          <input type="email" name="email" value={email} onChange={e => handleInputChange(e)}></input>
          <div>For authentication reasons, you will not be emailed</div>
        </div>
        <button onClick={handleReviewFormSubmit}>Submit!</button>
      </ReviewFormContext.Provider>
    </form>
  )
}

export default AddReview;