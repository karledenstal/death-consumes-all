const gulp = require('gulp');
const sass = require('gulp-sass');
const csso = require('gulp-csso');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const jshint = require('gulp-jshint');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const autoprefixer = require('gulp-autoprefixer');
const sync = require('browser-sync').create();

gulp.task('sync', () => {
  sync.init({
    port: 5001,
    server: {
      baseDir: './',
    },
    startPath: 'index.html',
  });
});

gulp.task('sass', () => {
  return gulp
    .src('./lib/styles/**')
    .pipe(plumber({ errorHandler: (err) => {
      notify.onError({
        title: 'Gulp error in ' + err.plugin,
        message: err.toString(),
      })(err);
    }}))
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(csso())
    .pipe(gulp.dest('./dist/css'))
    .pipe(
      sync.reload({
        stream: true,
      })
    );
});

gulp.task('sass-pages', () => {
  return gulp
    .src('./lib/styles/pages/**')
    .pipe(plumber({ errorHandler: (err) => {
      notify.onError({
        title: 'Gulp error in ' + err.plugin,
        message: err.toString(),
      })(err);
    }}))
    .pipe(sass({
      outputStyle: 'nested',
      precision: 10,
    }))
    .pipe(autoprefixer())
    .pipe(csso())
    .pipe(gulp.dest('./dist/css/pages'))
    .pipe(
      sync.reload({
        stream: true,
      })
    );
});

gulp.task('js', () => {
  return gulp
  .src('./lib/scripts/*.js')
  .pipe(concat('main.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('./dist/js'))
  .pipe(sync.reload({ stream: true }));
});

gulp.task('lint', () => {
  return gulp
  .src('./lib/scripts/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter('jshint-stylish'))
});

gulp.task('default', ['sync', 'sass', 'lint'], () => {
  gulp.watch('./lib/styles/**', ['sass']);
  gulp.watch('./lib/styles/pages', ['sass-pages']);
  gulp.watch('*.html', sync.reload);
  gulp.watch('./lib/pages/*.html', sync.reload);
});