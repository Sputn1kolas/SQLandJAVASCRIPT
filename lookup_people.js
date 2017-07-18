let person = process.argv[2]
const pg = require('pg')
const settings = require('./settings');

const client = new pg.Client({
  user : settings.user,
  password: settings.password,
  database: settings.database,
  host: settings.hostname,
  port: settings.port,
  ssl: settings.ssl
})

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query(findPerson, (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    let first_name = result.rows[0].first_name
    let last_name = result.rows[0].last_name
    let birthdate = YMD(result.rows[0].birthdate)
    console.log(
      `Found ${result.rows.length} person(s) by the name ${first_name}:
       -1: ${first_name} ${last_name}, born ${birthdate}`)
    client.end();
  });
});

let findPerson =
  `SELECT first_name, last_name, birthdate
  FROM famous_people
  WHERE first_name LIKE '%${person}%' OR last_name LIKE '%${person}%';`


function YMD(birthdateRaw){
  let month = function () {
    if(birthdateRaw.getUTCMonth() + 1 < 10) {
      let date = "0"
      date += birthdateRaw.getUTCMonth() + 1
      return date
    }
    return birthdateRaw.getUTCMonth() + 1
  }
  let birthdate = `${birthdateRaw.getUTCFullYear()}-${month()}-${birthdateRaw.getUTCDate()}`
  return birthdate
}

