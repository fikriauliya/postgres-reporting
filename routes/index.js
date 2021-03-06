var express = require('express');
var router = express.Router();
var pg = require('pg'),
  config = require('../config/config'),
  connectionString = config.db;
var _ = require('underscore')
var Report = require('../models/report');
var mongoose = require('mongoose');

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
  var title = req.body.title;
  var sqlId = req.body.sqlId;

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

      var reportHistory = {
        "executedAt": new Date(),
        "results": results
      };

      if (sqlId) {
        Report.update({_id: sqlId}, { $push: {histories: reportHistory }}, function() {
          res.json ({
            columns: JSON.stringify(columns),
            rows: JSON.stringify(results)
          });
        });
      } else {
        var newReport = new Report({ title: title, sql: sql, histories: [reportHistory]})
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
      }
    });

    if (err) {
      res.json( {
        error: err
      });
    }
  })
});

router.get('/reports/:id', function(req, res) {
  console.log(req.params.id)
  Report.find({_id: req.params.id}, '_id title sql', function(err, reports) {
    var report = reports[0];
    console.log(report);
    res.render('reports/show', {
      initialContent: JSON.stringify(report),
      sqlId: req.params.id
    })
  });
});

router.delete('/reports/:id', function(req, res) {
  console.log("Delete " + req.params.id);
  Report.remove({_id: req.params.id}, function(err, removed) {
    if (err) {
      res.json({
        "status": 400
      })
    } else {
      res.json({
        "status": 202
      });
    }
  });
});

router.get('/reports(:format?)', function(req, res) {
  Report.find({}, '_id title created_at', function(err, reports) {
    console.log(reports)
    if (req.params.format) {
      res.json({
        reports: JSON.stringify(reports)
      })
    } else {
      res.render('reports/index', {
        reports: JSON.stringify(reports)
      });
    }
  });
});

router.get('/reports/:id/histories', function(req, res) {
  Report.find({_id: req.params.id}, 'histories._id histories.executedAt', function(err, histories) {
    console.log(histories)
    res.json({
      data: JSON.stringify(histories[0])
    });
  });
});

router.get('/reports/:report_id/histories/:id', function(req, res) {
  Report.aggregate([
      { $match: {_id: mongoose.Types.ObjectId(req.params.report_id)}},
      { $project: {histories: 1}},
      { $unwind: "$histories"},
      { $match: {"histories._id": mongoose.Types.ObjectId(req.params.id)}}
    ]).exec(function(err, reports) {
      res.json({
        results: JSON.stringify(reports[0].histories)
      });
    });
});

module.exports = router;
