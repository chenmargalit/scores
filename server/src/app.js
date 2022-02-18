import express from 'express';
import serverConfig from './frameworks/web/server.js';
import config from './config/config.js';
import attachMiddlewares from './frameworks/middlewares/index.js';
import routes from './frameworks/web/routes/index.js';
import errorMiddleware from './frameworks/middlewares/error/error-middleware.js';
const app = express();

serverConfig(app, config).startServer();
attachMiddlewares(app);

routes(app, express);

app.use(errorMiddleware);

export default app;
