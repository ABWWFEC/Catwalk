import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Answer from './Answer.jsx';

const Question = ({ question }) => {
  const [ moreAnswers, setMoreAnswers ] = useState(false);
  const [ helpfulness, setHelpfulness ] = useState(null);
  const [ helpfulClick, setHelpfulClick ] = useState(false);

  useEffect(() => {
    setHelpfulness(question.question_helpfulness)
  }, [])

  const increaseHelpful = () => {
    axios.put(`/api/QA/questions/${ question.question_id }/helpful`)
      .then(() => setHelpfulClick(true))
      .catch(error => console.error(error));
  }

  const loadAndUnloadAnswers = () => {
    setMoreAnswers(!moreAnswers);
  }

  const renderAnswers = (answers) => {
    if (Object.keys(answers).length === 0) return;
    let allAnswers = [];
    let topTwo = [];

    for (const key in answers) {
      if (answers[key].answerer_name.toLowerCase() === 'seller') {
        topTwo.unshift(answers[key])
      }
      allAnswers.push(answers[key])
    }

    allAnswers.sort((a, b) => {
      if(a.helpfulness > b.helpfulness) return -1;
      if(a.helpfulness < b.helpfulness) return 1;
      return 0;
    })

    if (topTwo.length === 1 || allAnswers.length === 1) {
      topTwo.push(allAnswers[0]);
    } else {
      topTwo.push(allAnswers[0], allAnswers[1]);
    }

    if (moreAnswers) {
      return (<div>
        { allAnswers.map(answer => <Answer key={answer.id} answer={answer}/>
        ) }
        <button className='btn btn-link' onClick={ loadAndUnloadAnswers }>Hide Additional Answers</button>
      </div>)
    } else {
      return ( <div> {topTwo.map((answer, idx) => <Answer key={answer.id} answer={answer}/>)}
      { allAnswers.length > 2 && <button className='btn btn-link' onClick={ loadAndUnloadAnswers }>Load More Answers</button>}
      </div>)
    }
  }

  return (
    <div key={question.question_id}>
      <div>Q: {question.question_body}
      { !helpfulClick
          ?<a className='btn btn-link'
            onClick={() => {
            setHelpfulness(helpfulness + 1);
            increaseHelpful()} }
            >Helpful?
          </a>
          :<span>Helpful?</span>}
      <span>Yes</span><span>[{helpfulness}] | </span>
        <a
          className='btn btn-link'
          data-toggle='modal'
          href='#answer-form'>Add Answer
        </a>
      </div>
      A: { renderAnswers(question.answers) }
    </div>
  )
}

export default Question;