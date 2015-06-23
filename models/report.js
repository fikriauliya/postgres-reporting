var mongoose = require('mongoose'),
  config = require('../config/config'),
  connectionString = config.mongodb;

mongoose.connect(connectionString, function(error) {
  if (error) {
    console.log(error);
  }
});

var Schema = mongoose.Schema;
var ReportSchema = new Schema({
  title: { type: String },
  sql: { type: String },
  created_at: { type: Date, default: Date.now }
});

module.exports = Report = mongoose.model('reports', ReportSchema);
