const { Pool } = require("pg");
const dbParams = require("../lib/db");
const db = new Pool(dbParams);
db.connect().catch(e =>
  console.log(`Error connecting to Postgres server:\n${e}`)
);

module.exports = db;
