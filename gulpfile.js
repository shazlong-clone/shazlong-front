var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var rtlcss = require('gulp-rtlcss');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var cssimport = require('gulp-cssimport');
const cleanCSS = require('gulp-clean-css');

gulp.task('styles', function () {
  return gulp
    .src(['./src/index.css'])
    .pipe(
      cssimport({
        filter: /^\.\/.+/gi, // include only starts with ./ not http
      }),
    )
    .pipe(sourcemaps.init())
    .pipe(autoprefixer(['last 2 versions', '> 1%'])) // Other post-processing.
    .pipe(rename('main.css')) // Append "-rtl" to the filename.
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest('./src/assets/css')) // Output LTR stylesheets.
    .pipe(rtlcss()) // Convert to RTL.
    .pipe(rename({ suffix: '-rtl' })) // Append "-rtl" to the filename.
    .pipe(sourcemaps.write('.')) // Output source maps.
    .pipe(gulp.dest('./src/assets/css')); // Output RTL stylesheets.;
});
gulp.task('sourcemap', () => {
  return gulp
    .src('./src/assets/css/main.css')
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write('.').pipe(gulp.dest('./src/assets/css')));
});
