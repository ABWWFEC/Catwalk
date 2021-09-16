import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddQuest from './Q_and_A/AddQuest.jsx';
import MoreQuests from './Q_and_A/MoreQuests.jsx';
import QuestAnswer from './Q_and_A/QuestAnswer.jsx';
import QuestSearch from './Q_and_A/QuestSearch.jsx';
import AnswerForm from './Q_and_A/AnswerForm.jsx';

const QandA = ({ prodId }) => {
  const [ prodInfo, setProdInfo ] = useState({});
  const [ questInfo, setQuestInfo ] = useState({});

  useEffect(() => {
    axios.get(`/api/QA/questions/${prodId}`)
      .then(response => setQuestInfo (response.data))
      .then(() => {
        axios.get(`/api/product/${prodId}`)
          .then(response => setProdInfo(response.data))
          .catch(error => console.error(error));
      })
      .catch(error => console.error(error));
  }, [])

  return (
    <div>
      <div>Questions & Answers</div>
      <QuestSearch />
      <QuestAnswer
        questInfo={ questInfo }
      />
      <MoreQuests />
      <AddQuest />
      <AnswerForm />
    </div>
  )
}

export default QandA;