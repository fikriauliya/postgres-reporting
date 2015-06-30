reports_index = (function(){
  var React = require('react');
  var Griddle = require('griddle-react');
  var ReactIntl = require('react-intl');
  var FormattedRelative = ReactIntl.FormattedRelative;

  var reportsJson = JSON.parse(document.getElementById('reports').innerHTML)
  var LinkComponent = React.createClass({
    render: function(){
      url ="/reports/" + this.props.rowData._id;
      return <a href={url}>{this.props.data}</a>
    }
  });
  var DateComponent = React.createClass({
    render: function() {
      return <FormattedRelative value={this.props.data}/>
    }
  });
  var DeleteButtonComponent = React.createClass({
    handleDelete: function() {
      var sqlId = $(React.findDOMNode(this.refs.deleteButton)).attr('data-sql-id');
      $.ajax({
        url: "/reports/" + sqlId,
        type: "DELETE",
        success: function() {
          $.get("/reports.json", function(res) {
            var reportsJson = JSON.parse(res.reports);
            renderReports(reportsJson);
          });
        },
        fail: function() {
          alert("Error while deleting this record");
        }
      });
    },
    render: function() {
      return <button onClick={this.handleDelete} ref="deleteButton" data-sql-id={this.props.rowData._id} className="btn btn-danger btn-xs"><span className="glyphicon glyphicon-trash" aria-hidden="true"></span> Delete</button> 
    }
  });
  var columnMetadata = [
    {
      "columnName": "title",
      "displayName": "Title",
      "customComponent": LinkComponent
    },
    {
      "columnName": "created_at",
      "displayName": "Created At",
      "customComponent": DateComponent
    },
    {
      "columnName": "controls",
      "displayName": "",
      "customComponent": DeleteButtonComponent
    }
  ]

  var renderReports = function(reportsJson) {
    React.render(
      <Griddle showFilter={true} resultsPerPage={20} useFixedHeader={true} columns={["title", "created_at", "controls"]} columnMetadata={columnMetadata} results={reportsJson}/>,
      document.getElementById('react-app'))
  };

  renderReports(reportsJson);
})
