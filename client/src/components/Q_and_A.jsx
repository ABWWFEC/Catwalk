import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddQuest from './Q_and_A/AddQuest.jsx';
import MoreQuests from './Q_and_A/MoreQuests.jsx';
import QuestAnswerContainer from './Q_and_A/QuestAnswerContainer.jsx';
import QuestSearch from './Q_and_A/QuestSearch.jsx';

const QandA = ({ prodId }) => {
  const [ prodInfo, setProdInfo ] = useState({});
  const [ questInfo, setQuestInfo ] = useState([]);
  const [ constQuestInfo, setConstQuestInfo ] = useState([]);
  const [ searched, setSearched ] = useState(false);

  useEffect(() => {
    axios.get(`/api/QA/questions/${prodId}`)
      .then(response => {
        setQuestInfo(sortQuestions(response.data.results));
        setConstQuestInfo(sortQuestions(response.data.results));
      })
      .then(() => {
        axios.get(`/api/product/${prodId}`)
          .then(response => setProdInfo(response.data))
          .catch(error => console.error(error));
      })
      .catch(error => console.error(error));
  }, [])

  const sortQuestions = (questions) => {
    return questions.sort((a, b) => {
      if (a.question_helpfulness > b.question_helpfulness) return -1;
      if (a.question_helpfulness < b.question_helpfulness) return 1;
      return 0
    });
  }

  return (
    <div>
      <h5 className='card-title px-3'>Questions & Answers</h5>
      <QuestSearch
        questInfo={ questInfo }
        setQuestInfo={ setQuestInfo }
        constQuestInfo={ constQuestInfo }
        searched={ searched }
        setSearched={ setSearched }
      />
      <QuestAnswerContainer
        questInfo={ questInfo }
        prodId={ prodId }
        prodInfo={ prodInfo }
        setQuestInfo={ setQuestInfo }
        searched={ searched }
      />
    </div>
  )
}

export default QandA;