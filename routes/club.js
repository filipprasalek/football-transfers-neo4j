const errorResponse = require('../helpers/api').errorResponse;
const clubQueries = require('../helpers/db').clubQueries;
const runDBQuery = require('../config/db').runQuery;

async function getClub(request, h) {
  let clubs = null;
  if (Object.keys(request.query).length === 0) {
    clubs = await runDBQuery(clubQueries.getClubByName());
  } else { 
    clubs = await runDBQuery(clubQueries.getClubByName(request.query.name));
  }
  const response = {
    clubs: clubs.map(it => ({...it.get(0).properties, id: it.get(0).identity.low }))
  }
  return h.response(response).code(200);
}

async function getCashFlow(request, h) {
  const clubCashFlow = await runDBQuery(clubQueries.getCashFlowByClub(request.params.id));
  if (clubCashFlow.length === 0) {
    return h.response(errorResponse('Could not find cash flow for club with id ' + request.params.id)).code(404);
  }
  return h.response(clubCashFlow.map(it => it.get(0))).code(200);
}
module.exports = [
  { method: 'GET', path: '/club', handler: getClub },
  { method: 'GET', path: '/club/{id}/cash-flow', handler: getCashFlow },
];