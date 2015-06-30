var mongoose = require('mongoose'),
  config = require('../config/config'),
  connectionString = config.mongodb;

mongoose.connect(connectionString, function(error) {
  if (error) {
    console.log(error);
  }
});

var Schema = mongoose.Schema;
var HistorySchema = new Schema({
  executedAt: {type: Date, default: Date.now},
  results: []
});
var ReportSchema = new Schema({
  title: { type: String },
  sql: { type: String },
  created_at: { type: Date, default: Date.now },
  histories: { type: [HistorySchema]}
});

module.exports = Report = mongoose.model('reports', ReportSchema);
