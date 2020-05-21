# football-transfers-neo4j

This is web server that connects to Neo4j database and operates on given dataset: https://s3-eu-west-1.amazonaws.com/football-transfers.neo4j.com/transfers-all.csv.

You can run neo4j as a docker container with usage of following command:

```
docker run  -p 7474:7474 -p 7687:7687 -v $HOME/neo4j/data:/data -v $HOME/neo4j/plugins:/plugins -e NEO4J_AUTH=neo4j/test  neo4j
```
