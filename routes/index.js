var express = require('express');
var router = express.Router();
var pg = require('pg'),
  config = require('../config/config'),
  connectionString = config.db;

/* GET home page. */
router.get('/', function(req, res, next) {
  var results = [];
  console.log(connectionString)
  pg.connect(connectionString, function(err, client, done) {
    var query = client.query('SELECT * FROM users limit 50')
    query.on('row', function(row){
      results.push(row)
    });
    query.on('end', function() {
      client.end();
      res.render('index', { title: 'Express', results: results });
    });
  })
});

module.exports = router;
