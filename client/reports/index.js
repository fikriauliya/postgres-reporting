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
  var columnMetadata = [
    {
      "columnName": "title",
      "displayName": "Title",
      "customComponent": LinkComponent
    },
    {
      "columnName": "sql",
      "displayName": "SQL"
    },
    {
      "columnName": "created_at",
      "displayName": "Created At",
      "customComponent": DateComponent
    }
  ]
  React.render(
    <Griddle showFilter={true} resultsPerPage={20} useFixedHeader={true} columns={["title", "sql", "created_at"]} columnMetadata={columnMetadata} results={reportsJson}/>,
    document.getElementById('react-app'))
})
