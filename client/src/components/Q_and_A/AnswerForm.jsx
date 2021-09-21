import React, { useState, useRef } from 'react';
import validator from 'email-validator'
import axios from 'axios';
// import cloudinary from 'cloudinary';


// const CLOUDINARY_UPLOAD_PRESET = 'answerPhotosUpload'
// const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dipxthdkg/upload'
const AnswerForm = ({ prodId, prodInfo, question, idx, questInfo, setQuestInfo }) => {
  const [ answerText, setAnswerText ] = useState('');
  const [ nickname, setNickname ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ submissionCheck, setSubmissionCheck ] = useState(true);
  const [ photos, setPhotos ] = useState([]);
  const [ photo, setPhoto ] = useState({});
  const [ photoURL, setPhotoURL ] = useState('');
  const [ photoURLs, setPhotoURLs ] = useState([]);
  const [ photoCount, setPhotoCount ] = useState(0);
  const inputref = useRef();

  const fileHandler = (e) => {
    setPhoto(e.target.files[0]);
    setPhotoURL(URL.createObjectURL(e.target.files[0]));
  }

  const handlePhotoSubmit = () => {
    if (!photoURL) return;
    setPhotoURLs([ ...photoURLs, photoURL ]);
    setPhotos([ ...photos, photo ]);
    setPhotoCount(photoCount + 1);
  }

  const handleImagePreviews = () => {
    return (
      <div className='container'>
        <div className='row'>
          {photoURLs.map((url, idx) => {
              return(<img key={ idx } src={ url } style={{ 'width': '50%', 'height': '15vw','object-fit': 'cover', 'padding': '5px' }} className='mt-3 mr-auto card img-fluid'></img>)
          })
          }
        </div>
      </div>)
  }

  const sortQuestions = (questions) => {
    return questions.sort((a, b) => {
      if (a.question_helpfulness > b.question_helpfulness) return -1;
      if (a.question_helpfulness < b.question_helpfulness) return 1;
      return 0
    });
  };

  const handlePost = (e) => {
    const data = {
      body: answerText,
      name: nickname,
      email: email,
      photos: photoURLs
    };
    console.log(prodInfo);
    axios.post(`/api/QA/questions/${question.question_id}/answers`, data)
      .then(() => {
        axios.get(`/api/QA/questions/${prodInfo.id}`)
        .then(response => {
          setQuestInfo(sortQuestions(response.data.results));
        })
      })
      .catch(error => console.error(error))
    e.preventDefault();
  }

  const handleSubmit = (e) => {
    if (!validator.validate(email)) {
      setSubmissionCheck(false)
      return;
    }
    if (nickname.length < 2) {
      setSubmissionCheck(false)
      return;
    }
    if (answerText.length < 5) {
      setSubmissionCheck(false)
      return;
    }
    setSubmissionCheck(true);
  }

  return (
    <div>
      <div id={`answer-form-${ idx }`} className="modal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={ handlePost  }>
              <div className="modal-header">
                <h3 className="modal-title">
                  { prodInfo.name }: { question.question_body }
                </h3>

                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              <div className="modal-body">

                { !submissionCheck &&
                  <div className='fs-6 mb-3 badge bg-danger'>
                    Please check your responses and try again
                  </div>}

                <h6 id='your-quest'>Your Answer*</h6>

                <textarea
                  type='text'
                  className='form-control'
                  onChange={(e) => setAnswerText(e.target.value) }
                required />

                <h6 id='nickname'>What is your nickname?*</h6>
                <p className='fs-6 font-weight-light text-muted'>
                  <small>
                    For privacy reasons, do not use your full name or email
                  </small>
                </p>

                <input className='input-group mb-3 fs-6 form-control'
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder='Example: jack543!'
                required />

                <h6 id='email'>Your Email*</h6>
                <input type='email'
                  className='input-group mb-3 fs-6 form-control'
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Example: jack@email.com'
                required />

                <h6>Upload your photos </h6>
                <input
                  type='file'
                  ref={ inputref }
                  onChange={ fileHandler }
                  style={{ display: 'none' }}
                />

                <button className='btn btn-info' onClick={(e) => {
                  e.preventDefault();
                  inputref.current.click();
                }}>Select Photo</button>

                <div className='mt-3 fs-6'>{photo.name}</div>

                <button
                  className="btn btn-primary"
                  style={{ display: photoCount === 5 ? 'none' : 'block' }}
                  onClick={(e) => {
                    e.preventDefault();
                    handlePhotoSubmit();
                  }}>Upload Photo
                </button>
                { handleImagePreviews() }

              </div>
              <div className="modal-footer">
                <div className='fs-6 font-weight-light text-muted'>
                    <small>
                      For authentication reasons you will not be emailed
                    </small>
                </div>
                <div>
                  <button onClick={ handleSubmit }
                    className="btn btn-primary" type='submit' >Submit
                  </button>

                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal">Close
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnswerForm;