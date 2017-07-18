let first_name = process.argv[2]
let last_name = process.argv[3]
let  birthdate = process.argv[4]

const settings = require('./settings');


var knex = require('knex')({
  client: 'pg',
  connection: {
  user : settings.user,
  password: settings.password,
  database: settings.database,
  host: settings.hostname,
  port: settings.port,
  ssl: settings.ssl
  }
});

var pg = require('knex')({
  client: 'pg',
  connection: process.env.PG_CONNECTION_STRING,
  searchPath: 'knex, public'
});

knex('famous_people').insert({first_name: first_name, last_name: last_name, birthdate: birthdate })

  .then(function (result) {

    console.log("sucessfully added...", result)



  }).catch(function (err) {

      throw(err)

  // handle err (from either query)
});

knex.destroy(function(){})