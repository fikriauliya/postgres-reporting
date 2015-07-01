var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ReportResultConstants = require('../constants/ReportResultConstants');
var assign = require('object-assign');

var REFRESH_EVENT = 'refreshed';
var _rows = {}
var _columns = {}

function refresh(rows, columns) {
  console.log(rows);
  console.log(columns);
  _rows = rows;
  _columns = columns;
}

var ReportResultStore = assign({}, EventEmitter.prototype, {
  getAllRows: function() {
    return _rows;
  },
  getAllColumns: function() {
    return _columns;
  },
  emitRefresh: function() {
    console.log("emitRefresh");
    this.emit(REFRESH_EVENT);
  },
  addRefreshedListener: function(callback) {
    this.on(REFRESH_EVENT, callback);
  },
  removeRefreshedListener: function(callback) {
    this.removeListener(REFRESH_EVENT, callback);
  }
});

AppDispatcher.register(function(action) {
  console.log(action);
  switch(action.actionType) {
    case ReportResultConstants.REPORT_RESULT_REFRESHED:
      console.log("Refresh");
      refresh(action.rows, action.columns);
      ReportResultStore.emitRefresh();
      break;
    default:
  }
});

module.exports = ReportResultStore;
