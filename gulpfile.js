'use strict';

var browserify = require('browserify'),
  gulp = require('gulp'),
  source = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer'),
  globby = require('globby'),
  through = require('through2'),
  gutil = require('gulp-util'),
  uglify = require('gulp-uglify'),
  sourcemaps = require('gulp-sourcemaps'),
  reactify = require('reactify'),
  rename = require('gulp-rename'),
  nodemon = require('gulp-nodemon'),
  es = require('event-stream');

gulp.task('js', function(done) {
  globby('./client/*.js', function(err, files) {
    if (err) {
      bundledStream.emit('error', err);
      return;
    }
    var tasks = files.map(function(entry) {
      var b = browserify({
        entries: entry,
        debug: true,
        transform: [reactify]
      });
      return b.bundle()
        .pipe(source(entry))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
          // Add gulp plugins to the pipeline here.
          .pipe(uglify())
          .on('error', gutil.log)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./public/js')); 
      });
    es.merge.apply(null, tasks);
    done();
  })
});

gulp.task('start', ['js'], function(done) {
  nodemon({
    script: 'bin/www'
  });
});

gulp.task('watch', function(done){
  gulp.watch('client/*js', ['js']);
});

gulp.task('default', ['js', 'start', 'watch']);
