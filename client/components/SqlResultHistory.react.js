var React = require('react');
var Griddle = require('griddle-react');
var ReactIntl = require('react-intl');
var FormattedRelative = ReactIntl.FormattedRelative;
var $ = require('jquery');
var ReportResultHistoryActions = require('../actions/ReportResultHistoryActions'),
  ReportResultHistoryConstants = require('../constants/ReportResultHistoryConstants'),
  ReportResultHistoryStore = require('../stores/ReportResultHistoryStore')

var DateLinkComponent = React.createClass({
  handleClick: function(historyId) {
    console.log(historyId);
    ReportResultHistoryActions.refreshResult(historyId);
  },
  render: function() {
    return <a href="#" onClick={this.handleClick.bind(this, this.props.rowData._id)}><FormattedRelative value={this.props.data}/></a>
  }
});
var columnMetadata = [
  {
    "columnName": "executedAt",
    "displayName": "Run at",
    "customComponent": DateLinkComponent
  }
]
module.exports = SqlResultHistory = React.createClass({
  getInitialState: function() {
    return {
      histories: []
    }
  },
  componentDidMount: function() {
    ReportResultHistoryStore.addRefreshedListener(this._onHistoryRefreshed);
    ReportResultHistoryActions.showAll(this.props.sqlId);
  },
  componentWillUnmount: function() {
    ReportResultHistoryStore.removeRefreshedListener(this._onHistoryRefreshed);
  },
  _onHistoryRefreshed: function() {
    console.log("_onHistoryRefreshed");
    console.log(ReportResultHistoryStore.getAllHistories());
    this.setState({histories: ReportResultHistoryStore.getAllHistories()});
  },
  render: function() {
    return (
      <Griddle resultsPerPage={7} useFixedHeader={true} columns={["executedAt"]} columnMetadata={columnMetadata} results={this.state.histories}/>
    );
  }
})
