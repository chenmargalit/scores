import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './addPlayerForm.css';
import { ValidationsClass } from '../../../utils/validations/validationClass';
import { INPUT_NOT_VALID } from '../../../static/messages';
import { BASE_URL } from '../../../static/config';

const AddPlyaerForm = () => {
  const [dbScoresData, setDbScoresData] = useState([]);

  const [scoreData, setScoreData] = useState({
    name: '',
    id: '',
    score: ''
  });
  const [error, setError] = useState({
    name: '',
    id: '',
    score: ''
  });

  useEffect(() => {
    async function getScoresData() {
      let scoresData = await axios.get(`${BASE_URL}/scores/get-scores`);
      scoresData = scoresData.data.sort((a, b) => b.score - a.score);
      setDbScoresData(scoresData);
    }
    getScoresData();
  }, []);

  const handleForm = e => {
    return setScoreData({ ...scoreData, [e.target.name]: e.target.value });
  };

  const handleFormValidation = (name, value) => {
    switch (name) {
      case 'name':
        return ValidationsClass.validateLength(value, 1, 10);
      case 'score':
        return ValidationsClass.validateAmount(value, 1, 100000);
      case 'id':
        return ValidationsClass.validateAmount(value, 1, Infinity);
      default:
        return true;
    }
  };

  const submitForm = async e => {
    e.preventDefault();
    let validationFailed = false;
    for (let item in scoreData) {
      const isItemValid = handleFormValidation(item, scoreData[item]);
      if (!isItemValid) {
        validationFailed = true;
        setError(error => ({ ...error, [item]: INPUT_NOT_VALID }));
      }
    }
    if (!validationFailed) {
      const addDataResult = await axios.post(
        `${BASE_URL}/scores/create-score`,
        scoreData
      );
      console.log('add data result', addDataResult.data);
    }
  };

  const renderScores = () => {
    return (
      <div className='one-row-div'>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {dbScoresData.map((item, index) => {
              if (index <= 9) {
                return (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.score}</td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div>
      <form>
        <label>
          Name
          <input
            className='add-player-form__input'
            onChange={handleForm}
            value={scoreData['name']}
            type='text'
            name='name'
          />
          {error.name && (
            <p className='add-player-form__warning-text'>{error.name}</p>
          )}
        </label>
        <label>
          ID
          <input
            className='add-player-form__input'
            onChange={handleForm}
            value={scoreData.id}
            type='number'
            name='id'
          />
        </label>
        {error.id && (
          <p className='add-player-form__warning-text'>{error.id}</p>
        )}
        <label>
          Score
          <input
            className='add-player-form__input'
            onChange={handleForm}
            value={scoreData.score}
            type='number'
            name='score'
          />
        </label>
        {error.score && (
          <p className='add-player-form__warning-text'>{error.score}</p>
        )}
        <button className='add-player-form__button' onClick={submitForm}>
          Add
        </button>
      </form>
      <div>
        <h1>Leaderboard</h1>
        {dbScoresData.length > 0 && renderScores()}
      </div>
    </div>
  );
};

export default AddPlyaerForm;
