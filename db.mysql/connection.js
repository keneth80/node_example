var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'pretty0408',
  // port     : '8000',
  database: 'node'
});
console.log('Database Connection!');

module.exports = connection;
