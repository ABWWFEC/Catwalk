import React, { useState } from 'react';
import validator from 'email-validator';

const QuestForm = ({ prodInfo }) => {
  const [ questText, setQuestText ] = useState('');
  const [ nickname, setNickname ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ submissionCheck, setSubmissionCheck ] = useState(true);


  const handleSubmit = (e) => {
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
    console.log(submissionCheck);
  }

  return (
    <div>
      <div className="modal" tabIndex="-1" role="form">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Ask Your Question</h3>
              <h4>About { prodInfo.name }</h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {!submissionCheck && <div>Please fill out all fields and ensure you are entering a valid email.</div>}
              <h5 id='your-quest'>Your Question*</h5>
              <textarea onChange={(e) => setQuestText(e.target.value)} />
              <h5 id='nickname'>What is your nickname?*</h5>
              <input onChange={(e) => setNickname(e.target.value)} placeholder='Example: jackson11!' />
              <p>For privacy reasons, do not use your full name or email address</p>
              <h5 id='email'>Your Email*</h5>
              <input onChange={(e) => setEmail(e.target.value)} placeholder='Why did you like the product or not?' />
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


export default QuestForm;