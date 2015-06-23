var React = require('react'),
  $ = require('jquery')

module.exports = SqlInput = React.createClass({
  handleClick: function(e) {
    $.post('/reports/', {sql: React.findDOMNode(this.refs.sql).value})
  },
  render: function() {
    return (
      <div>
        <textarea rows="8" cols="150" ref="sql"/>
        <br></br>
        <button onClick={this.handleClick} className="btn btn-primary btn-md">Create</button>
      </div>
    );
  }
})
