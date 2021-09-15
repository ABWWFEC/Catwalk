import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QuestAnswer = ({ questInfo }) => {
  const [ answerInfo, setAnswerInfo ] = useState({});
  const dateParser = (date) => {
    const dateValues = date.slice(0, 10);
    const yearMonDay = dateValues.split('-');
    const monthNames = ['Zero Month', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const monthIdx = Number(yearMonDay[1]);
    const beautifulDate = `${monthNames[monthIdx]} ${yearMonDay[2]}, ${yearMonDay[0]}`

    return beautifulDate;
  }


  useEffect(() => {
    // DON'T FORGET TO CHANGE THE ID HERE TO BE prodId
    // hard coding this so I can make sure it is rendering to the page
    axios.get(`/api/QA/questions/348448/answers`)
      .then(response => setAnswerInfo(response.data.results))
      .catch(error => console.error(error));
  }, [])

  const renderPhotos = (photos) => {
    if (photos.length > 0) {
      return (
        <span>
          {photos.map((photo, idx) => {
            return (
              <div key={idx}><img style={{width: '50px'}}className='answer-photos' src={photo.url}></img></div>
            )
          })}
        </span>)
    }
  }

  const renderAnswer = () => {
    if (answerInfo.length > 0) {
      return <div> A:{answerInfo.map(answer => {
        return (
          <div key={ answer.answer_id }>
            <div> { answer.body }</div>
              { renderPhotos(answer.photos) }
              <span>by { answer.answerer_name } { dateParser(answer.date) } | </span>
              <span>Helpful? </span><span>Yes</span><span>[{ answer.helpfulness }] | </span>
              <span>Report</span>
          </div>
        )
      })}</div>
    } else {
      return (
        <div>A: No answers, so sad</div>
      )
    }
  }


  return (
    <div>
      <div>Q: { questInfo.question_body }
        <span>Helpful?</span>
        <span>Yes</span>
        <span>[{ questInfo.question_helpfulness }] | </span>
        <span>Add Answer</span>
      </div>
      {renderAnswer()}
    </div>
  )
}

/*
QUESTION ---------------------------------------
{
            "question_id": 348447,
            "question_body": "Does this product run big or small?",
            "question_date": "2019-01-17T00:00:00.000Z",
            "asker_name": "jbilas",
            "question_helpfulness": 10,
            "reported": false,
            "answers": {}
        },
        {
            "question_id": 348448,
            "question_body": "How long does it last?",
            "question_date": "2019-07-06T00:00:00.000Z",
            "asker_name": "funnygirl",
            "question_helpfulness": 7,
            "reported": false,
            "answers": {
                "3257748": {
                    "id": 3257748,
                    "body": "It runs small",
                    "date": "2019-11-17T00:00:00.000Z",
                    "answerer_name": "dschulman",
                    "helpfulness": 1,
                    "photos": [
                        "https://images.unsplash.com/photo-1470116892389-0de5d9770b2c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
                        "https://images.unsplash.com/photo-1536922645426-5d658ab49b81?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
                    ]
                },
                "3257772": {
                    "id": 3257772,
                    "body": "Showing no wear after a few months!",
                    "date": "2019-09-06T00:00:00.000Z",
                    "answerer_name": "sillyguy",
                    "helpfulness": 8,
                    "photos": []
                }
            }
        },
        {
            "question_id": 348445,
            "question_body": "What fabric is the top made of?",
            "question_date": "2018-01-04T00:00:00.000Z",
            "asker_name": "yankeelover",
            "question_helpfulness": 1,
            "reported": false,
            "answers": {
                "3257688": {
                    "id": 3257688,
                    "body": "Something pretty soft but I can't be sure",
                    "date": "2018-01-04T00:00:00.000Z",
                    "answerer_name": "metslover",
                    "helpfulness": 5,
                    "photos": [
                        "https://images.unsplash.com/photo-1530519729491-aea5b51d1ee1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80",
                        "https://images.unsplash.com/photo-1511127088257-53ccfcc769fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
                        "https://images.unsplash.com/photo-1500603720222-eb7a1f997356?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1653&q=80"
                    ]
                },
                "3257690": {
                    "id": 3257690,
                    "body": "Its the best! Seriously magic fabric",
                    "date": "2018-01-04T00:00:00.000Z",
                    "answerer_name": "metslover",
                    "helpfulness": 8,
                    "photos": []
                },
                "3257691": {
                    "id": 3257691,
                    "body": "DONT BUY IT! It's bad for the environment",
                    "date": "2018-01-04T00:00:00.000Z",
                    "answerer_name": "metslover",
                    "helpfulness": 8,
                    "photos": []
                },
                "3257740": {
                    "id": 3257740,
                    "body": "Suede",
                    "date": "2018-11-04T00:00:00.000Z",
                    "answerer_name": "metslover",
                    "helpfulness": 7,
                    "photos": []
                },
                "3257778": {
                    "id": 3257778,
                    "body": "Supposedly suede, but I think its synthetic",
                    "date": "2018-12-04T00:00:00.000Z",
                    "answerer_name": "metslover",
                    "helpfulness": 3,
                    "photos": []
                }
            }
        },
        {
            "question_id": 425848,
            "question_body": "this is a test body",
            "question_date": "2021-09-14T00:00:00.000Z",
            "asker_name": "this is a test name",
            "question_helpfulness": 0,
            "reported": false,
            "answers": {}
        },
        {
            "question_id": 425839,
            "question_body": "this is a test body",
            "question_date": "2021-09-12T00:00:00.000Z",
            "asker_name": "this is a test name",
            "question_helpfulness": 0,
            "reported": false,
            "answers": {}
        }
    ]
}
--------------------------------------- QUESTION


ANSWERS ----------------------------------------
        {
            "answer_id": 3257784,
            "body": "Only if you want to ruin it!",
            "date": "2018-03-08T00:00:00.000Z",
            "answerer_name": "ceasar",
            "helpfulness": 5,
            "photos": []
        },
        {
            "answer_id": 3257790,
            "body": "Yes",
            "date": "2018-03-08T00:00:00.000Z",
            "answerer_name": "Seller",
            "helpfulness": 4,
            "photos": []
        },
        {
            "answer_id": 3989484,
            "body": "test body",
            "date": "2021-09-11T00:00:00.000Z",
            "answerer_name": "test name",
            "helpfulness": 0,
            "photos": []
        },
        {
            "answer_id": 3989486,
            "body": "test body",
            "date": "2021-09-11T00:00:00.000Z",
            "answerer_name": "test name",
            "helpfulness": 0,
            "photos": []
        },
        {
            "answer_id": 3989485,
            "body": "test body",
            "date": "2021-09-11T00:00:00.000Z",
            "answerer_name": "test name",
            "helpfulness": 0,
            "photos": []
        }
    ]
}
---------------------------------------ANSWERS
*/

export default QuestAnswer;