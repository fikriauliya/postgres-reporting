var React = require('react'),
  $ = require('jquery')

module.exports = SqlInputResult = React.createClass({
  getInitialState: function() {
    return {
      rows: [],
      columns: []
    }
  },
  handleInputSubmit: function(input) {
    var me = this;
    $.post('/reports/', {sql: input.sql, title: input.title}, function(result) {
      me.setState({rows: JSON.parse(result.rows), columns: JSON.parse(result.columns)});
    });
  },
  render: function() {
    var sqlResult;
    if (this.state.rows.length > 0) {
      sqlResult = <div><hr/><SqlResult rows={this.state.rows} columns={this.state.columns}></SqlResult></div>
    }
    return (
      <div>
        <SqlInput enableEdit={this.props.enableEdit} initialContent={this.props.initialContent} onInputSubmit={this.handleInputSubmit}></SqlInput>
        {sqlResult}
      </div>
    );
  }
})
