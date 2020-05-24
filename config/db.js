const neo4j = require('neo4j-driver')

const dbUser = 'neo4j';
const dbPassword = 'test';

const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic(dbUser, dbPassword))

const connect = async () => {
  const session = driver.session();
  try {
    await session.run('RETURN "HELLO"');
  } finally {
    session.close();
  }
  return driver;
}

const runQuery = async (query) => {
  const session = driver.session();
  let result = null;
  try {
    result = await session.run(query)
  } catch (e) {
    console.log(e.message)
  } finally {
    session.close();
  }
  return result.records;
}

module.exports = { 
  connect, runQuery
}