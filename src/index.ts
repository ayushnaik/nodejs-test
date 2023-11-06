/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-fallthrough */
/* eslint-disable no-process-exit */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import './pre-start'; // Must be the first import
import logger from 'jet-logger';
import * as http from 'http';
import 'module-alias/register';

import EnvVars from './constants/EnvVars';
import app from './server';
import mongoose from 'mongoose';


// **** Run **** //

const SERVER_START_MSG = ('Express server started on ');

const server = http.createServer(app);


/**
 * MongoDB Connection
 */  
mongoose
  .connect(EnvVars.Database.Url)
  .then(() => {
    logger.info('DB Connection Successful');
  })
  .catch((err: any) => {
    logger.err(err);
    closeServer();
    process.exit(1);
  });

server.listen(EnvVars.Port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error: any) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof EnvVars.Port === 'string' ? 'Pipe ' + EnvVars.Port : 'Port ' + EnvVars.Port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
  case 'EACCES':
    logger.err(bind + ' requires elevated privileges');
    process.exit(1);
  case 'EADDRINUSE':
    logger.err(bind + ' is already in use');
    process.exit(1);
  default:
    throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe :' + addr : 'port :' + addr?.port;
  // debug('Listening on ' + bind);
  logger.info(SERVER_START_MSG + bind);
}

//This is a signal handler. It is listening for the SIGTERM signal. When it receives the signal, it will log a warning and then close the server.
process.on('SIGTERM', () => {
  logger.warn('SIGTERM Signal Recieved.');
  logger.info('Closing Http & Database Server.');
  closeServer();
});

//Listening for the SIGINT signal. When it receives the signal, it will log a warning and then close the server.
process.on('SIGINT', () => {
  logger.warn('SIGINT Signal Recieved.');
  logger.info('Closing Http & Database Server.');
  closeServer();
});

//Listening for the SIGQUIT signal. When it receives the signal, it will log a warning and then close the server.
process.on('SIGQUIT', () => {
  logger.warn('SIGQUIT Signal Recieved.');
  logger.info('Closing Http & Database Server.');
  closeServer();
});

//This is a signal handler. It is listening for the SIGTERM signal. When it receives the signal, it will log a warning and then close the server.
function closeServer() {
  server.close(async () => {
    logger.warn('Http Server Closed.');
    try {
      await mongoose.connection.close();
      await mongoose.disconnect();
      logger.warn('Database Server Closed.');
      process.exit(0);
    } catch (err) {
      logger.err('Something went wrong while closing Database Server.', err);
    }
  });
}
