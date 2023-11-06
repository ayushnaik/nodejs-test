/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/**
 * Setup express server.
 */

import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import express, { Request, Response, NextFunction } from 'express';
import logger from 'jet-logger';
import swaggerUi from 'swagger-ui-express';
import 'express-async-errors';

import EnvVars from '@src/constants/EnvVars';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';

import { NodeEnvs } from '@src/constants/misc';
import { RouteError } from '@src/other/classes';
import swaggerDocument from '@src/resources/SwaggerDocument';

import BookRouter from '@src/routes/BookRouter';


// **** Variables **** //

const app = express();


// **** Setup **** //

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser(EnvVars.CookieProps.Secret));

// Show routes called in console during development
if (EnvVars.NodeEnv === NodeEnvs.Dev.valueOf()) {
  app.use(morgan('dev'));
}

// Security
if (EnvVars.NodeEnv === NodeEnvs.Production.valueOf()) {
  app.use(helmet());
}

/* The `app.use(cors());` line of code is enabling Cross-Origin Resource Sharing (CORS) for the Express
server. CORS is a mechanism that allows resources (e.g., fonts, JavaScript, etc.) on a web page to
be requested from another domain outside the domain from which the resource originated. */
app.use(cors());

// Add error handler
app.use((
  err: Error,
  _: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  if (EnvVars.NodeEnv !== NodeEnvs.Dev.valueOf()) {
    logger.err(err, true);
  }
  let status = HttpStatusCodes.BAD_REQUEST;
  if (err instanceof RouteError) {
    status = err.status;
  }
  return res.status(status).json({ message: err.message, data: {}, error: err });
});


// ** Front-End Content ** //

// Set static directory (js and css).
const staticDir = path.join(__dirname, 'public');
app.use(express.static(staticDir));


/* `app.use("/apiDocs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));` is setting up a route for
serving the Swagger UI documentation. */
app.use('/apiDocs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/book', BookRouter);

/* The `app.get('/', (_: Request, res: Response) => { ... })` code block is defining a route handler
for the root URL ("/") of the server. */
app.get('/', (_: Request, res: Response) => {
  return res.render('index', {
    title: 'Node.js Backend Developer Challenge',
  });
});


// **** Export default **** //

export default app;
