import bodyParser from 'body-parser';
import cors from 'cors';
import errorMiddleware from './error/error-middleware.js';

const attachMiddlewares = app => {
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());

};

export default attachMiddlewares;
