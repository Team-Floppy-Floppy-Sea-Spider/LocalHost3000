const { Pool } = require('pg');
// pool to manage our connections to the database (has a few advantages).
// There is overhead in establishing new connections to the database that we don't want to wait on for every single query we send.
// Having a pool of connections at the ready makes our database queries more performant.
// The PostgreSQL server can only handle a limited number of clients at a time.
// Depending on the available memory of your PostgreSQL server you may even crash the server if you connect an unbounded number of clients.PostgreSQL can only process one query at a time on a single connected client in a first-in first-out manner. If your multi-tenant web application is using only a single connected client all queries among all simultaneous requests will be pipelined and executed serially, one after the other. No good!

// PostgreSQL can only process one query at a time on a single connected client in a first-in first-out manner. If your multi-tenant web application is using only a single connected client all queries among all simultaneous requests will be pipelined and executed serially, one after the other. No good!
// const path = require('path');

const PG_URI = require('../databaseURI');


// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: PG_URI,
});

/*
CREATE TABLE user_info (
    id SERIAL PRIMARY KEY,
    username varchar(255),
    password varchar(255),
    name varchar(255),
    home varchar(255),
    email varchar(255),
    type varchar(255),
    profilepic varchar(255)
);
*/

// We export an object that contains a property called query,
// which is a function that returns the invocation of pool.query() after logging the query
// This will be required in the controllers to be the access point to the database

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
