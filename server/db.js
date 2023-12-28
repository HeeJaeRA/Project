const mysql = require("mysql");
const sql = require("./db/sql.js");

const pool = mysql.createPool({
  connectionLimit: process.env.MYSQL_LIMIT,
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PWD,
  database: process.env.MYSQL_DB,
});

const query = async (alias, values) => {
  return new Promise((resolve, reject) =>
    pool.query(sql[alias], values, (error, results) => {
      if (error) {
        console.log(error);
        reject({ error });
      } else resolve(results);
    })
  );
};

module.exports = { query };
