import { ApiError } from '../../../frameworks/middlewares/error/errorClass.js';
import { isStrANumber, verifyLength } from '../../../utils/valiationUtils.js';
import { INVALID_CREDENTIALS } from '../../../static/messages.js';
const scoreController = relationalDbQueries => {
  const getScores = async (req, res, next) => {
    try {
      const scoresData = await relationalDbQueries.getAllFromTable('scores');
      return res.send(scoresData);
    } catch (e) {
      console.log('e is', e);
      next(ApiError.badRequest('request failed'));
    }
  };
  const createScore = async (req, res, next) => {
    try {
      const { id, name, score } = req.body;
      if (!id || !name || !score) {
        return next(ApiError.missingCredentials(INVALID_CREDENTIALS));
      }
      const isInputValid = validateInputs(id, name, score);
      if (!isInputValid) {
        return next(ApiError.missingCredentials(INVALID_CREDENTIALS));
      }

      await relationalDbQueries.createScoreInDb(id, name, score);
      return res.status(200).send('success');
    } catch (e) {
      console.log('e is', e);
      next(ApiError.badRequest('request failed'));
    }
  };

  const validateInputs = (id, name, score) => {
    const isIdANumber = isStrANumber(id);
    const isScoreANumber = isStrANumber(score);
    const isIdInRange = verifyLength(id, 1, 20);
    const isScoreInRange = verifyLength(score, 1, 10000);
    const isNameLengthInRange = verifyLength(name, 1, 40);
    return (
      isIdANumber &&
      isScoreANumber &&
      isIdInRange &&
      isScoreInRange &&
      isNameLengthInRange
    );
  };

  return { getScores, createScore };
};
export default scoreController;
