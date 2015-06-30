'use strict';

var browserify = require('browserify'),
  watchify = require('watchify'),
  gulp = require('gulp'),
  source = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer'),
  globby = require('globby'),
  glob = require('glob'),
  through = require('through2'),
  gutil = require('gulp-util'),
  uglify = require('gulp-uglify'),
  sourcemaps = require('gulp-sourcemaps'),
  reactify = require('reactify'),
  rename = require('gulp-rename'),
  nodemon = require('gulp-nodemon'),
  forever = require('forever-monitor'),
  gutil = require('gulp-util'),
  assign = require('lodash.assign'),
  notifier = require("node-notifier"),
  notify = require("gulp-notify"),
  es = require('event-stream');

gulp.task('browserify', function(done) {
  // set up the browserify instance on a task basis
  var jsFiles = glob.sync('./client/**/*.js');
  var b = browserify({
    entries: jsFiles, 
    debug: true,
    transform: [reactify]
  });

  return b.bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist'));
});

// ================================= start watchify ==============================================
var jsFiles = glob.sync('./client/**/*.js');
var customOpts = {
  entries: jsFiles, 
  debug: true,
  transform: [reactify]
};
var opts = assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts)); 
b.on('update', watchifyBundle); // on any dep update, runs the bundler
b.on('log', gutil.log); // output build logs to terminal

gulp.task('watchify', watchifyBundle);
function watchifyBundle() {
  // set up the browserify instance on a task basis
  return b.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    // optional, remove if you don't need to buffer file contents
    .pipe(buffer())
    // optional, remove if you dont want sourcemaps
    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
       // Add transformation tasks to the pipeline here.
    .pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest('./dist'))
    .pipe(notify("Watchified"))
}
// ================================= end watchify ==============================================

// gulp.task('js', function(done) {
//   globby('./client#<{(||)}>#*.js', function(err, files) {
//     if (err) {
//       bundledStream.emit('error', err);
//     }
//     var tasks = files.map(function(entry) {
//       var b = browserify({
//         entries: entry,
//         debug: true,
//         transform: [reactify]
//       });
//       return b.bundle()
//         .pipe(source(entry))
//         .pipe(buffer())
//         .pipe(sourcemaps.init({loadMaps: true}))
//           // Add gulp plugins to the pipeline here.
//           .pipe(uglify())
//           .on('error', gutil.log)
//         .pipe(sourcemaps.write('./'))
//         .pipe(gulp.dest('./public/js')); 
//       });
//     es.merge.apply(null, tasks);
//     done();
//   })
// });
//
gulp.task('start', function(done) {
  nodemon({
    script: 'bin/www',
    verbose: 'true',
    ext: 'html js handlebars',
    env: {'PORT': 3030},
    ignore: ['client/', 'bower_components/', 'node_modules/', 'dist/', '.git/']
  }).on('restart', function() {
    notifier.notify({
      'title': 'Nodemon',
      'message': 'Server restarted'
    });
  });
  done();
});
//
// gulp.task('watch', function(done){
//   var watcher = gulp.watch('client#<{(||)}>#*.js', ['js']);
//   watcher.on('change', function (event) {
//      console.log('Event type: ' + event.type); // added, changed, or deleted
//      console.log('Event path: ' + event.path); // The path of the modified file
//   });
// });

// gulp.task('default', ['js', 'start', 'watch']);
gulp.task('default', ['browserify', 'start']);
gulp.task('develop', ['watchify', 'start']);
