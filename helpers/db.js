const getPlayersByName = (name = '.*') => {
  return `MATCH (player:Player) WHERE player.name =~ ".*(?i)${name}.*" RETURN player LIMIT 100`;
}

const getPlayerTransfersByPlayerId = (id) => {
  const query = [
    'MATCH (p:Player)<-[:OF_PLAYER]-(t:Transfer), (c1:Club)<-[:FROM_CLUB]-(t:Transfer)-[:TO_CLUB]->(c2:Club)',
    `WHERE id(p) = ${id}`,
    'WITH *',
    'ORDER BY t.timestamp',
    'WITH p, ({destination: apoc.text.join([c1.name, c2.name], "->"), fee: t.fee}) as transfer',
    'RETURN {name: p.name , transfers: collect(transfer)}'
  ]
  return query.join(' ');
}

const getClubByName = (name = '.*') => {
  return `MATCH (club:Club) WHERE club.name =~ ".*(?i)${name}.*" RETURN club LIMIT 100`;
}

const getCashFlowByClub = (clubId) => {
  const query = [
    'MATCH (p:Player)<-[:OF_PLAYER]-(t:Transfer)',
    'MATCH (seller)<-[:FROM_CLUB]-(t:Transfer)-[:TO_CLUB]->(buyer)',
    `WHERE t.numericFee > 0 AND (id(seller) = ${clubId} OR id(buyer) = ${clubId})`,
    'WITH seller, buyer, sum(t.numericFee) AS cash_flow, collect(p.name) as players',
    'RETURN {buyer: buyer.name, seller: seller.name, cash_flow: cash_flow, players: players}',
    'ORDER BY cash_flow DESC'
  ];
  return query.join(' '); 
}

module.exports = {
  playerQueries: {getPlayersByName, getPlayerTransfersByPlayerId},
  clubQueries: {getClubByName, getCashFlowByClub}
}