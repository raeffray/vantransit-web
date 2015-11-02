var neo4j = require('node-neo4j');

var host = process.env.NEO4J_HOST;

var token = process.env.NEO4J_TOKEN;

var user = process.env.NEO4J_USER;

var passwd = process.env.NEO4J_PASSWD;

//var Neo4jDb = new neo4j('http://:'+token+'@'+host+':7474');

var Neo4jDb = new neo4j('http://'+user+':'+passwd+'@'+host+':7474');

module.exports = {
  Neo4jDb: Neo4jDb
}

// when using token based authentication 
//db = new neo4j('http://:your-authentication-token@domain:port');
