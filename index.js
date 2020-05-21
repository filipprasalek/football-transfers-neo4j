'use strict';

const Hapi = require('hapi');
const db = require('./db.js')

const init = async () => {
  const server = new Hapi.Server({
    host: 'localhost',
    port: 3000
  });

  await server.start();
  console.log('Server is running at: %s', server.info.uri);
}

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

process.on('exit', () => {
  db.close()
})

init();
