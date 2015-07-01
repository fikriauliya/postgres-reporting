var React = require('react');
var Griddle = require('griddle-react');
var ReactIntl = require('react-intl');
var FormattedRelative = ReactIntl.FormattedRelative;
var $ = require('jquery');

var DateLinkComponent = React.createClass({
  handleClick: function(historyId) {
    console.log(historyId);
    this.props.onHistoryClick(historyId);
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
    var me = this;
    $.get('/reports/' + this.props.sqlId + '/histories', function(res) {
      console.log(JSON.parse(res.data))
      me.setState({histories: JSON.parse(res.data).histories});
    })
  },
  render: function() {
    return (
      <Griddle resultsPerPage={7} useFixedHeader={true} columns={["executedAt"]} columnMetadata={columnMetadata} results={this.state.histories}/>
    );
  }
})
