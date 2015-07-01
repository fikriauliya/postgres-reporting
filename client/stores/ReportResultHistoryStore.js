var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ReportResultHistoryConstants = require('../constants/ReportResultHistoryConstants');
var assign = require('object-assign');

var REFRESH_EVENT = 'refreshed';
var _histories = {}
var _sqlId = {}

function refresh(histories) {
  _histories = histories;
}

var ReportResultHistoryStore = assign({}, EventEmitter.prototype, {
  getSqlId: function() {
    return _sqlId;
  },
  getAllHistories: function() {
    return _histories;
  },
  emitRefresh: function() {
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
    case ReportResultHistoryConstants.REPORT_RESULT_HISTORY_REFRESHED:
      _sqlId = action.sqlId
      console.log("Refresh");
      refresh(action.histories);
      ReportResultHistoryStore.emitRefresh();
      break;
    default:
  }
});

module.exports = ReportResultHistoryStore;
