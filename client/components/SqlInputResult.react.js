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
    $.post('/reports/', {sql: input.sql, title: input.title, sqlId: input.sqlId}, function(result) {
      me.setState({rows: JSON.parse(result.rows), columns: JSON.parse(result.columns)});
    });
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
          <SqlResultHistory sqlId={this.props.sqlId}/>
        </div>
      </div>
    );
  }
})
