'use strict';

const Hapi = require('hapi');

const db = require('./config/db');
const routes = require('./routes');
let dbDriver = null;

const init = async () => {
  const server = new Hapi.Server({
    host: 'localhost',
    port: 3000
  });

  dbDriver = await db.connect();

  server.route(routes);
  await server.start();
  console.log('Server is running at: %s', server.info.uri);
}

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

process.on('exit', () => {
  if (dbDriver) {
    dbDriver.close();
  }
})

init();
