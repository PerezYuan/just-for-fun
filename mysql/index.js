var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '',
  port     : '',
  user     : '',
  password : '',
  database : ''
});
 
connection.connect();

module.exports = connection;