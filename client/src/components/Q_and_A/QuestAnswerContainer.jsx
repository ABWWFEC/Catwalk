import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AnswerForm from './AnswerForm.jsx';
import MoreQuests from './MoreQuests.jsx';
import AddQuest from './AddQuest.jsx';
import Question from './Question.jsx';

const QuestAnswerContainer = ({ prodId, prodInfo, questInfo }) => {
  const [ questCheck, setQuestCheck ] = useState(0);
  const [ questAmount, setQuestAmount ] = useState(0);

  useEffect(() => {
    setQuestAmount(questInfo.length);
  }, [ questInfo ] );

  const renderQuestions = () => {
    return questInfo.map(question => (
      <Question key={question.question_id} question={question}/>
    ))
  }

  return (
    <div>
      { questAmount > 0
        ? <div> { renderQuestions() }
            <MoreQuests />
            <AddQuest
              prodInfo={prodInfo}
              questInfo={questInfo}
            />
            <AnswerForm />
          </div>
        : <div>
            <AddQuest
              prodInfo={prodInfo}
              questInfo={questInfo}
            />
            <AnswerForm />
          </div>
      }
    </div>
  )
}

export default QuestAnswerContainer;