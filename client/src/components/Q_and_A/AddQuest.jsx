import React, { useState } from 'react';
import QuestForm from './QuestForm.jsx';

const AddQuest = ({ prodInfo, questInfo, setQuestInfo }) => {
  const [ showModal, setShowModal ] = useState(false);

  return (
    <div className='col'>
      <button type="button"
        data-toggle="modal"
        data-target="#quest-form"
        className="btn btn-primary">
        Add Question +
      </button>
      <QuestForm
        prodInfo={ prodInfo }
        questInfo={ questInfo }
        setQuestInfo={ setQuestInfo }
      />
    </div>
  )
}

export default AddQuest;