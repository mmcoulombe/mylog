const db = require('./db');

module.exports = {
  createTableResolver: (req, res, next) => {
    if (db.isConnected()) {
      var name = req.params.name;
      if (name === undefined || name === null) {
        return Promise.reject(new Error('Invalid name parameters'));
      }
      db.createTable(name)
        .then(() => {
          next()
        })
        .catch((err) => {
          res.statusCode = 400;
          return res.json({ errors: err.message });
        });
    }
  },
  addLogResolver: (req, res, next) => {
    if (db.isConnected()) {
      var name = req.params.name;
      var logs = req.body.logs;
      
      if (name === undefined || name === null) {
        return Promise.reject(new Error('Invalid name parameters'));
      }
      db.addLogs(name, logs)
        .then(() => {
          next();
        })
        .catch((err) => {
          res.statusCode = 400;
          return res.json({ errors: err.message });
        });
    }
  }
}