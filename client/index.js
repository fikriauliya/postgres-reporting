index = (function() {
  var React = require('react');
  var FixedDataTable = require('fixed-data-table');
  var Table = FixedDataTable.Table;
  var Column = FixedDataTable.Column;

  var _ = require('underscore')

  var rowsJson = JSON.parse(document.getElementById('rows').innerHTML)
  var columnsJson = JSON.parse(document.getElementById('columns').innerHTML) 

  function rowGetter(rowIndex) {
    return rowsJson[rowIndex];
  }

  React.render(
    <Table
      rowHeight={40}
      rowGetter={rowGetter}
      rowsCount={rowsJson.length}
      width={1200}
      height={500}
      headerHeight={50}>
      {_.map(columnsJson, function(val, key) { 
        return <Column key={key} label={val} width={200} dataKey={key}/> 
      })}
    </Table>,
    document.getElementById('react-app'))
})
