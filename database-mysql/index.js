const mysql = require('mysql');
const mysqlConfig = require('./config.js');

const link = mysql.createConnection(mysqlConfig);



link.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log('Successful connection to MySQL');
  }
});

module.exports = link



