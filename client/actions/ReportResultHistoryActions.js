var AppDispatcher = require('../dispatcher/AppDispatcher');
var ReportResultHistoryConstants = require('../constants/ReportResultHistoryConstants');
var ReportResultHistoryStore = require('../stores/ReportResultHistoryStore');
var ReportResultActions = require('../actions/ReportResultActions');
var $ = require('jquery');
var sqlId = {}

var ReportResultHistoryActions = {
  showAll: function(sqlId) {
    $.get('/reports/' + sqlId + '/histories', function(res) {
      console.log(JSON.parse(res.data))
      AppDispatcher.dispatch({
        actionType: ReportResultHistoryConstants.REPORT_RESULT_HISTORY_REFRESHED,
        sqlId: sqlId,
        histories: JSON.parse(res.data).histories
      });
    })
  },
  refreshResult: function(historyId) {
    var sqlId = ReportResultHistoryStore.getSqlId();
    $.get('/reports/' + sqlId + '/histories/' + historyId, function(res) {
      var rows = JSON.parse(res.results).results;
      ReportResultActions.refresh(rows, rows[0]);
    });
  }
};

module.exports = ReportResultHistoryActions;
