reports_new = (function() {
  var React = require('react');
  var SqlInputResult = require('../../client/components/SqlInputResult.react.js')
  React.render(<SqlInputResult></SqlInputResult>, document.getElementById('sql-input-result-app'));
})
