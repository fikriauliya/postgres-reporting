reports_index = (function(){
  var React = require('react');
  var FixedDataTable = require('fixed-data-table');
  var Table = FixedDataTable.Table;
  var Column = FixedDataTable.Column;

  var _ = require('underscore')

  var reportsJson = JSON.parse(document.getElementById('reports').innerHTML)
  var columnsJson = ['Title', 'SQL', 'Created at'];

  function rowGetter(rowIndex) {
    var report = reportsJson[rowIndex];
    return [report.title, report.sql, report.created_at];
  }

  React.render(
    <Table
      rowHeight={40}
      rowGetter={rowGetter}
      rowsCount={reportsJson.length}
      width={1200}
      height={500}
      headerHeight={50}>
      {_.map(columnsJson, function(val, key) { 
        return <Column key={key} label={val} width={200} dataKey={key}/> 
      })}
    </Table>,
    document.getElementById('react-app'))
})
