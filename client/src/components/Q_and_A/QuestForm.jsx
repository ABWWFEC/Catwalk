import React, { useState } from 'react';
import validator from 'email-validator';
import axios from 'axios';

const QuestForm = ({ prodInfo, setQuestInfo }) => {
  const [ questText, setQuestText ] = useState('');
  const [ nickname, setNickname ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ submissionCheck, setSubmissionCheck ] = useState(true);

  const handlePost = (e) => {
    const data = {
        body: questText,
        name: nickname,
        email: email,
        product_id: prodInfo.id
      };

    axios.post('/api/QA/questions', data)
      .then(() => {
        axios.get(`/api/QA/questions/${ prodInfo.id }`)
        .then(response => {
          setQuestInfo(sortQuestions(response.data.results));
        })
      })
      .catch(error => console.error(error))
      const questCloser = document.getElementById('question-closer');
      questCloser.click();
      e.preventDefault();
  }

  const sortQuestions = (questions) => {
    return questions.sort((a, b) => {
      if (a.question_helpfulness > b.question_helpfulness) return -1;
      if (a.question_helpfulness < b.question_helpfulness) return 1;
      return 0
    });
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
    if (questText.length < 5) {
      setSubmissionCheck(false)
      return;
    }
    setSubmissionCheck(true);
  }

  return (
    <div>
      <div id='quest-form' className="modal" tabIndex="-1" role="form">
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={ handlePost }>
              <div className="modal-header">
                <h3 className="modal-title">
                  Ask Your Question about {prodInfo.name}
                </h3>
                <button type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              <div className="modal-body">
                {!submissionCheck &&

                <div className='fs-6 mb-3 badge bg-danger'>
                  Please check your responses and try again
                </div>}

                <h6 id='your-quest'>Your Question*</h6>
                <textarea type='text'
                  className='form-control'
                  onChange={(e) => setQuestText(e.target.value)}
                required />

                <h6 id='nickname'>What is your nickname?*</h6>
                <p className='fs-6 font-weight-light text-muted'>
                  <small>
                    For privacy reasons, do not use your full name or email address
                  </small>
                </p>

                <input className='input-group mb-3 fs-6 form-control'
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder='Example: jackson11!'
                required />

                <h6 id='email'>Your Email*</h6>
                <input type='email'
                  className='input-group mb-3 fs-6 form-control'
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Why did you like the product or not?'
                required />
              </div>

              <div className="modal-footer">
                <div className='fs-6 font-weight-light text-muted'>
                  <small>
                    For authentication reasons you will not be emailed
                  </small>
                </div>

                <div>
                  <button onClick={ handleSubmit }
                    type="submit" className="btn btn-primary">Submit
                  </button>

                  <button type="button"
                    id='question-closer'
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


export default QuestForm;