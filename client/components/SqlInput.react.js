var React = require('react'),
  $ = require('jquery')

module.exports = SqlInput = React.createClass({
  getDefaultProps: function() {
    return {
      initialContent: {
        title: '',
        sql: ''
      }
    }
  },
  handleClick: function(e) {
    e.preventDefault();
    this.props.onInputSubmit({
      title: React.findDOMNode(this.refs.title).value,
      sql: React.findDOMNode(this.refs.sql).value,
      sqlId: this.props.sqlId
    })
  },
  render: function() {
    return (
      <div className="row">
        <div className="col-md-12">
          <form className="form-horizontal">
            <div className="form-group">
              <div className="col-md-6">
                <input className="form-control" placeholder="Title" ref="title" defaultValue={this.props.initialContent.title}/>
              </div>
            </div>
            <div className="form-group">
              <div className="col-md-6">
                <textarea className="form-control" placeholder="SQL Query" rows="8" ref="sql" defaultValue={this.props.initialContent.sql}/>
              </div>
            </div>
            <div className="form-group">
              <div className="col-md-12">
                <button onClick={this.handleClick} className="btn btn-primary btn-md">Run</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
})
