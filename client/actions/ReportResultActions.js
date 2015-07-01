var AppDispatcher = require('../dispatcher/AppDispatcher');
var ReportResultConstants = require('../constants/ReportResultConstants');

var ReportResultActions = {
  refresh: function(rows, columns) {
    console.log("Dispatched");
    AppDispatcher.dispatch({
      actionType: ReportResultConstants.REPORT_RESULT_REFRESHED,
      rows: rows,
      columns:  columns,
    });
  },
  requestRefresh: function(sql, title, sqlId) {
    var me = this;
    $.post('/reports/', {sql: sql, title: title, sqlId: sqlId}, function(result) {
      me.refresh(JSON.parse(result.rows), JSON.parse(result.columns));
    });
  }
};

module.exports = ReportResultActions;
