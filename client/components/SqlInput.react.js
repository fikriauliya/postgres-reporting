var React = require('react'),
  $ = require('jquery')

module.exports = SqlInput = React.createClass({
  getInitialState: function() {
    return {
      sql: ''
    }
  },
  handleClick: function(e) {
    this.setState({sql: React.findDOMNode(this.refs.sql).value})
    $.post('/reports/', {sql: this.state.sql})
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
