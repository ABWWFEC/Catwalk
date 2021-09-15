import React, { useState } from 'react';
import validator from 'email-validator'

const AnswerForm = ({ prodInfo, questInfo }) => {
  const [ answerText, setAnswerText ] = useState('');
  const [ nickname, setNickname ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ submissionCheck, setSubmissionCheck ] = useState(true);
  const [ photos, setPhotos ] = useState([]);
  const [ photo, setPhoto ] = useState({});
  const [ photoURL, setPhotoURL ] = useState('');
  const [ photoURLs, setPhotoURLs ] = useState([]);
  const [ photoCount, setPhotoCount ] = useState(0);

  const fileHandler = (e) => {
    setPhoto(e.target.files[0]);
    setPhotoURL(URL.createObjectURL(e.target.files[0]));
  }

  const handlePhotoSubmit = () => {
    setPhotoURLs([...photoURLs, photoURL]);
    setPhotos([...photos, photo]);
    setPhotoCount(photoCount + 1);
  }

  const handleImagePreviews = () => {
    return photoURLs.map((url, idx) => (
      <img key={idx} src={url} ></img>));
  }

  const handleSubmit = (e) => {
    console.log(questInfo);
    if (!validator.validate(email)) {
      setSubmissionCheck(false)
      // const email = document.getElementById('email');
      // email.style.color = 'red';
      return;
    }
    if (nickname.length < 2) {
      setSubmissionCheck(false)
      // const nickname = document.getElementById('nickname');
      // nickname.style.color = 'red';
      return;
    }
    if (questText.length < 5) {
      setSubmissionCheck(false)
      // const yourQuest = document.getElementById('your-quest');
      // yourQuest.style.color = 'red';
      return;
    }
    setSubmissionCheck(true);
  }

  return (
    <div>
    <div className="modal" tabIndex="-1" role="form">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h3 className="modal-title">Submit your Answer</h3>
            <h4>PRODUCT INFO: QUESTION BODY HERE</h4>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {!submissionCheck && <div>Please fill out all fields and ensure you are entering a valid email.</div>}
            <h5 id='your-quest'>Your Answer*</h5>
            <textarea onChange={(e) => setAnswerText(e.target.value)} />
            <h5 id='nickname'>What is your nickname?*</h5>
            <input onChange={(e) => setNickname(e.target.value)} placeholder='Example: jack543!' />
            <p>For privacy reasons, do not use your full name or email address</p>
            <h5 id='email'>Your Email*</h5>
            <input onChange={(e) => setEmail(e.target.value)} placeholder='Example: jack@email.com' />
            <h5>Upload your photos </h5>
            <input
              type='file'
              onChange={ fileHandler }
            />
            <button
              style={{ display: photoCount === 5 ? 'none': 'block'}}
              onClick={ handlePhotoSubmit }>Upload Photo
            </button>
            { handleImagePreviews() }
            <p>For authentication reasons, you will not be emailed.</p>
          </div>
          <div className="modal-footer">
            <button onClick={ handleSubmit } type="button" className="btn btn-primary">Submit</button>
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default AnswerForm;