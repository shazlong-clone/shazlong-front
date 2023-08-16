var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var rtlcss = require('gulp-rtlcss');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var cssimport = require('gulp-cssimport');
const cleanCSS = require('gulp-clean-css');

gulp.task('styles', function () {
  return gulp
    .src(['./public/css/index.css'])
    .pipe(
      cssimport({
        filter: /^\.\/.+/gi, // include only starts with ./ not http
      }),
    )
    .pipe(sourcemaps.init())
    .pipe(autoprefixer(['last 2 versions', '> 1%'])) // Other post-processing.
    .pipe(rename('main.css')) // Append "-rtl" to the filename.
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest('./public/css')) // Output LTR stylesheets.
    .pipe(rtlcss()) // Convert to RTL.
    .pipe(rename({ suffix: '-rtl' })) // Append "-rtl" to the filename.
    .pipe(sourcemaps.write('.')) // Output source maps.
    .pipe(gulp.dest('./public/css')); // Output RTL stylesheets.;
});
gulp.task('sourcemap', () => {
  return (
    gulp
      .src('./public/css/main.css')
      .pipe(sourcemaps.init())
      // Perform other CSS processing here (e.g., autoprefixing, minification)
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('./public/css'))
  );
});

gulp.task('all', gulp.series('styles', 'sourcemap'));
