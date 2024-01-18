const mysql = require("mysql2");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "abc123",
  database: "taskmanager",
});

module.exports = con;
