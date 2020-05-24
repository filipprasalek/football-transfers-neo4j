const errorResponse = require('../helpers/api').errorResponse;
const playerQueries = require('../helpers/db').playerQueries;
const runDBQuery = require('../config/db').runQuery;


async function getPlayers(request, h) {
  let players = null;
  if (Object.keys(request.query).length === 0) {
    players = await runDBQuery(playerQueries.getPlayersByName());
  } else { 
    players = await runDBQuery(playerQueries.getPlayersByName(request.query.name));
  }
  const response = {
    players: players.map(it => ({...it.get(0).properties, id: it.get(0).identity.low }))
  }
  return h.response(response).code(200);
}

async function getPlayerTransfersByPlayerId(request, h) {
  const playerTransfers = await runDBQuery(playerQueries.getPlayerTransfersByPlayerId(request.params.id));
  if (playerTransfers.length === 0) {
    return h.response(errorResponse('Could not find proper transfers of a player with id ' + request.params.id)).code(404);
  }
  console.log(playerTransfers[0].get(0))
  return h.response(playerTransfers[0].get(0)).code(200);
}


module.exports = [
  { method: 'GET', path: '/player', handler: getPlayers },
  { method: 'GET', path: '/player/{id}/transfers', handler: getPlayerTransfersByPlayerId }
];