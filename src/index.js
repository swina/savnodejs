/* eslint-disable no-console */
//const logger = require('./logger');
const app = require('./app');
const port = app.get('port');
// const server = app.listen(port);
app.listen(port).then(server => {
  
  console.log('Feathers application started on http://%s:%d', app.get('host'), port)
});

process.on('unhandledRejection', (reason, p) =>
  console.log ( reason )
  //logger.error('Unhandled Rejection at: Promise ', p, reason)
);

// server.on('listening', () =>
//   logger.info('Feathers application started on http://%s:%d', app.get('host'), port)
// );
