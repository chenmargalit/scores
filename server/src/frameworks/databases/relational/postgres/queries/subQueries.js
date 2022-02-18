import pgClient from '../postgres-connection.js';

const doesRecordExist = async (table, id) => {
  try {
    const strQuery = `SELECT * FROM ${table} where id=$1 `;
    const values = [id];
    const res = await pgClient.query(strQuery, values);
    return res;
  } catch (err) {
    console.log('error creating score in db');
    return 'failed';
  }
};

const updateRecord = async (table, column, id, score) => {
  try {
    const strQuery = `UPDATE ${table} set ${column}=$1 where id=$2`;
    const values = [score, id];
    await pgClient.query(strQuery, values);
  } catch (err) {
    console.log('error creating score in db');
    return 'failed';
  }
};

const getAllFromTable = async table => {
  try {
    const res = await pgClient.query(`SELECT * FROM ${table}`);
    if (res.rowCount === 0) {
      return 'no data to show';
    }
    return res.rows;
  } catch (err) {
    console.log('err with getting all data from table');
  }
};

const createScoreInDb = async (id, name, score) => {
  try {
    const doesRecordExistInDb = await doesRecordExist('scores', id);
    if (doesRecordExistInDb.rowCount > 0) {
      updateRecord('scores', 'score', id, score);
    } else {
      const strQuery =
        'INSERT INTO scores (id, name, score) VALUES($1, $2, $3)';
      const values = [id, name, score];
      const res = await pgClient.query(strQuery, values);
    }
  } catch (err) {
    console.log('error creating score in db');
    return 'failed';
  }
};

const relationalDbQueries = { getAllFromTable, createScoreInDb };

export default relationalDbQueries;
