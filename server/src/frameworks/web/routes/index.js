import { scoresRouter } from './scores.js';

export const routes = (app, express) => {
  app.use('/api/v1/scores', scoresRouter(express));
};

export default routes;
