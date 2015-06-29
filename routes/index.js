var express = require('express');
var router = express.Router();
var pg = require('pg'),
  config = require('../config/config'),
  connectionString = config.db;
var _ = require('underscore')
var Report = require('../models/report');

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
  var sql = req.body.sql;
  var results = [];
  pg.connect(connectionString, function(err, client, done) {
    var query = client.query(sql)
    var columns = []
    query.on('row', function(row){
      results.push(_(row).toArray())
      columns = Object.keys(row)
    });
    query.on('end', function() {
      client.end();

      var newReport = new Report({ title: 'report #1', sql: sql})
      newReport.save(function(err) {
        if (err) {
          res.json ({
            error: err
          });
        } else {
          res.json ({
            columns: JSON.stringify(columns),
            rows: JSON.stringify(results)
          });
        }
      });
    });

    if (err) {
      res.json( {
        error: err
      });
    }
  })
});

router.get('/reports/', function(req, res) {
  Report.find(function(err, reports) {
    console.log(reports);

    res.render('reports/index', {
      reports: JSON.stringify(reports)
    });
  });
});

module.exports = router;
