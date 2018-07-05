const mysql = require('mysql');

var connection = {}
var connected = false;

module.exports = {
  connect: (config) => {
    console.log('Trying to connect to MySQL');

    connection = mysql.createConnection({
      host: config.host,
      user: config.username,
      password: config.password,
      database: config.database
    })
    connected = true;
  },
  createTable: (name) => {
    return new Promise((resolve, reject) => {
      const queryString = `CREATE TABLE IF NOT EXISTS ${name}(
        id int primary key auto_increment,
        log TEXT NOT NULL
      )`;
  
      connection.query(queryString, (err, result, fields) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
  addLogs: (tableName, log) => {
    return new Promise((resolve, reject) => {
      connection.query(`INSERT INTO ${tableName} (log) VALUES ('${log}')`, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      })
    });
  },
  isConnected: () => connected
}