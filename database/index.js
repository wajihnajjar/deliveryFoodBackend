var mysql = require("mysql2");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "delivery",
});
connection.connect(()=>{
  console.log("Database Connected")
})

module.exports = connection;
