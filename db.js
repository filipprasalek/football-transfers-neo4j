const neo4j = require('neo4j-driver')

const dbUser = 'neo4j';
const dbPassword = 'test';

const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic(dbUser, dbPassword))

const test = async () => {
  const session = driver.session();
  try {
    const result = await session.run(
      'MATCH (p:Player)<-[:OF_PLAYER]-(t1)-[:NEXT]->(t2), (initial)<-[:FROM_CLUB]-(t1)-[:TO_CLUB]->(club1)<-[:FROM_CLUB]-(t2)-[:TO_CLUB]->(club2) WHERE none(t in [t1, t2] where t:Loan) RETURN p.name as player, club1.name AS profitMaker , initial.name as buysFrom, club2.name AS sellsTo, t2.numericFee - t1.numericFee as profit, (t2.timestamp - t1.timestamp) / 60 / 60 / 24 AS daysAtClub ORDER BY profit DESC'
    )  
    console.log(JSON.stringify(result.records))
  } finally {
    await session.close()
  }
}

test();

module.exports = driver;