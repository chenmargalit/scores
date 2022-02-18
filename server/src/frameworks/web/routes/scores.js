import scoreHandler from '../../../adapters/controllers/scores-controller/score-controller.js';
import relationalDbQueries from '../../databases/relational/postgres/queries/subQueries.js';
export const scoresRouter = express => {
  const router = express.Router();

  const scoreController = scoreHandler(relationalDbQueries);
  router.route('/get-scores').get(scoreController.getScores);
  router.route('/create-score').post(scoreController.createScore);

  return router;
};
