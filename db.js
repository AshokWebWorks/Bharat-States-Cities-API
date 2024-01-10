const Pool = require("pg").Pool;
//on development
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "bharatstatescitiesapi",
  password: "1234",
  port: 5432,
});
//on production
// const pool = new Pool({
//     connectionString: process.env.POSTGRES_URL + "?sslmode=require",
//   })
module.exports = pool;
