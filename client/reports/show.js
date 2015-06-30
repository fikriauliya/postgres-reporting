reports_show = (function() {
  var React = require('react');
  var SqlInputResult = require('../../client/components/SqlInputResult.react.js')

  var initialContent = JSON.parse(document.getElementById('initialContent').innerHTML)
  React.render(<SqlInputResult enableEdit={false} initialContent={initialContent}></SqlInputResult>, document.getElementById('sql-input-result-app'));
})
