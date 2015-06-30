var React = require('react');
var Griddle = require('griddle-react');
var ReactIntl = require('react-intl');
var FormattedRelative = ReactIntl.FormattedRelative;
var $ = require('jquery');

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
      <Griddle resultsPerPage={10} useFixedHeader={true} columns={["executedAt"]} results={this.state.histories}/>
    );
  }
})
