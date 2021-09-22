import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AnswerForm from './AnswerForm.jsx';
import MoreQuests from './MoreQuests.jsx';
import AddQuest from './AddQuest.jsx';
import Question from './Question.jsx';

const QuestAnswerContainer = ({ searched, prodId, prodInfo, questInfo, setQuestInfo }) => {
  const [ questAmount, setQuestAmount ] = useState(0);
  const [ moreQuestions, setMoreQuestions ] = useState(false);

  useEffect(() => {
    setQuestAmount(questInfo.length);
  }, [ questInfo, moreQuestions, searched ]);

  const renderQuestions = () => {
    if (searched) {
      return (
        <div className='accord-container overflow-auto'>
          <div className='accordion' id='quest-accordion'>
            { questInfo.map((question, idx) => (
              <Question
                prodId={ prodId }
                prodInfo={ prodInfo }
                helperIdx={ 'collapse' + idx }
                idx={ idx }
                key={ question.question_id }
                question={ question }
                setQuestInfo={ setQuestInfo }
                questInfo={ questInfo }
              />
            ))}
          </div>
        </div>
      )
    } else if (!moreQuestions) {
      const onlyTwo = questInfo.slice(0, 2);
      return (
        <div className='accord-container overflow-auto'>
          <div className='accordion' id='quest-accordion'>
            {onlyTwo.map((question, idx) => (
              <Question
                prodInfo={ prodInfo }
                helperIdx={ 'collapse' + idx }
                idx={ idx }
                key={ question.question_id }
                question={ question }
                setQuestInfo={ setQuestInfo }
                questInfo={ questInfo }
              />
            ))}
          </div>
        </div>
      )
    } else {
      return (
        <div className='accord-container overflow-auto'>
          <div className='accordion' id='quest-accordion'>
            { questInfo.map((question, idx) => (
              <Question
                prodInfo={ prodInfo }
                helperIdx={ 'collapse' + idx }
                idx={ idx }
                key={ question.question_id }
                question={ question }
                setQuestInfo={ setQuestInfo }
                questInfo={ questInfo }
              />
            ))}
          </div>
        </div>
      )
    }
  }

  return (
    <div>
      {questAmount >= 2
        ? <div> {renderQuestions()}
        <div className='container mt-3'>
          <div className='row row-cols-auto'>
          <MoreQuests
            moreQuestions={moreQuestions}
            setMoreQuestions={setMoreQuestions}
          />
          <AddQuest
            prodInfo={prodInfo}
            prodId={prodId}
            questInfo={questInfo}
            setQuestInfo={setQuestInfo}
          />
          </div>
          </div>
        </div>
        : <div> {renderQuestions()}
          <AddQuest
            prodId={prodId}
            prodInfo={prodInfo}
            questInfo={questInfo}
            setQuestInfo={setQuestInfo}
          />
        </div>
      }
    </div>
  )
}

export default QuestAnswerContainer;