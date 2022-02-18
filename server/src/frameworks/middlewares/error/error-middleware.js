import { ApiError } from './errorClass.js';

export const errorMiddleware = (err, req, res, next) => {
  console.log('error middleware activated', err);
  if (err instanceof ApiError) {
    res.status(err.statusCode).json(err.msg);
  } else {
    res.status(500).json('internal server error');
  }
};

export default errorMiddleware;
