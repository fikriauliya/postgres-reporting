var React = require('react'),
  FixedDataTable = require('fixed-data-table'),
  Table = FixedDataTable.Table,
  Column = FixedDataTable.Column,
  _ = require('underscore')

module.exports = SqlResult = React.createClass({
  rowGetter: function(rowIndex) {
      return this.props.rows[rowIndex];
  },
  render: function() {
    if (this.props.rows.length > 0) {
      return (
        <Table
          rowHeight={40}
          rowGetter={this.rowGetter}
          rowsCount={this.props.rows.length}
          width={1200}
          height={500}
          headerHeight={50}>
          {_.map(this.props.columns, function(val, key) { 
            return <Column key={key} label={val} width={200} dataKey={key}/> 
          })}
        </Table>
      );
    } else {
      return "Empty";
    }
  }
})
