var React = require('react'),
  $ = require('jquery')

module.exports = SqlInput = React.createClass({
  handleClick: function(e) {
    e.preventDefault();
    this.props.onInputSubmit({
      title: React.findDOMNode(this.refs.title).value,
      sql: React.findDOMNode(this.refs.sql).value
    })
  },
  render: function() {
    return (
      <div className="row">
        <div className="col-md-12">
          <form className="form-horizontal">
            <div className="form-group">
              <div className="col-md-6">
                <input className="form-control" placeholder="Title" ref="title"/>
              </div>
            </div>
            <div className="form-group">
              <div className="col-md-8">
                <textarea className="form-control" placeholder="SQL Query" rows="8" cols="150" ref="sql"/>
              </div>
            </div>
            <div className="form-group">
              <div className="col-md-12">
                <button onClick={this.handleClick} className="btn btn-primary btn-md">Create</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
})
