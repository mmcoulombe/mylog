const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./db');
const resolver = require('./resolver');

const config = require('./config.json');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = config.server.port || 8000;

var router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'mylog is up' })
});

router.post('/projects/add/:name', resolver.createTableResolver, (req, res) => {
  res.statusCode = 201;
  return res.json({ msg: 'Project added !' });
});

router.post('/projects/:name/logs/add', resolver.addLogResolver, (req, res) => {
  res.statusCode = 201;
  return res.json({ msg: 'log added' });
})

app.use('/api/v1', router)

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  db.connect(config.mysql);
});
