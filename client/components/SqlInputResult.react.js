var React = require('react'),
  $ = require('jquery'),
  ReportResultActions = require('../actions/ReportResultActions'),
  ReportResultConstants = require('../constants/ReportResultConstants'),
  ReportResultStore = require('../stores/ReportResultStore')

module.exports = SqlInputResult = React.createClass({
  getInitialState: function() {
    return {
      rows: [],
      columns: []
    }
  },
  componentDidMount: function() {
    ReportResultStore.addRefreshedListener(this._onResultRefreshed);
  },
  componentWillUnmount: function() {
    ReportResultStore.removeRefreshedListener(this._onResultRefreshed);
  },
  _onResultRefreshed: function() {
    console.log("_onResultRefreshed");
    console.log(ReportResultStore.getAllRows());
    this.setState({rows: ReportResultStore.getAllRows(), columns: ReportResultStore.getAllColumns()});
  },
  handleHistoryClick: function(historyId) {
    console.log(historyId);
  },
  handleInputSubmit: function(input) {
    ReportResultActions.requestRefresh(input.sql, input.title, input.sqlId);
    // $.post('/reports/', {sql: input.sql, title: input.title, sqlId: input.sqlId}, function(result) {
    //   me.setState({rows: JSON.parse(result.rows), columns: JSON.parse(result.columns)});
    // });
  },
  render: function() {
    var sqlResult;
    if (this.state.rows.length > 0) {
      sqlResult = <div><hr/><SqlResult rows={this.state.rows} columns={this.state.columns}></SqlResult></div>
    }
    return (
      <div className="row">
        <div className="col-md-6">
          <SqlInput enableEdit={this.props.enableEdit} sqlId={this.props.sqlId} initialContent={this.props.initialContent} onInputSubmit={this.handleInputSubmit}></SqlInput>
          {sqlResult}
        </div>
        <div className="col-md-6">
          <h4>History</h4>
          <SqlResultHistory onHistoryClick={this.handleHistoryClick} sqlId={this.props.sqlId}/>
        </div>
      </div>
    );
  }
})
