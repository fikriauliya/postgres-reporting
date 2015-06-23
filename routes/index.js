var express = require('express');
var router = express.Router();
var pg = require('pg'),
  config = require('../config/config'),
  connectionString = config.db;
var _ = require('underscore')

/* GET home page. */
router.get('/', function(req, res, next) {
  var results = [];
  pg.connect(connectionString, function(err, client, done) {
    var query = client.query('SELECT * FROM users')
    var columns = []
    query.on('row', function(row){
      results.push(_(row).toArray())
      columns = Object.keys(row)
    });
    query.on('end', function() {
      client.end();

      res.render('index', { 
        title: 'Express', 
        columns: JSON.stringify(columns),
        rows: JSON.stringify(results)
      });
    });
  })
});

router.get('/reports/new', function(req, res, next) {
 res.render('reports/new') 
});

router.post('/reports/', function(req, res) {
  console.log(req.body.sql)
});

module.exports = router;
