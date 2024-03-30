var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var rtlcss = require('gulp-rtlcss');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var cssimport = require('gulp-cssimport');
const cleanCSS = require('gulp-clean-css');
var less = require('gulp-less');
var path = require('path');

//TO DO
// 1- convert all pathes to be _dirname + path
gulp.task('create-rtl-css', function () {
  return (
    gulp
      // eslint-disable-next-line no-undef
      .src([path.join(__dirname, 'public/css/index.css')])
      .pipe(
        cssimport({
          filter: /^\.\/.+/gi, // include only starts with ./ not http
        }),
      )
      .pipe(sourcemaps.init())
      .pipe(autoprefixer(['last 2 versions', '> 1%'])) // Other post-processing.
      .pipe(rename('main.css')) // Rename to "main.css".
      .pipe(cleanCSS({ compatibility: 'ie8' }))
      // eslint-disable-next-line no-undef
      .pipe(gulp.dest(path.join(__dirname, 'public/css'))) // Output LTR stylesheets.
      .pipe(rtlcss()) // Convert to RTL.
      .pipe(rename({ suffix: '-rtl' })) // Append "-rtl" to the filename.
      .pipe(sourcemaps.write('.')) // Output source maps.
      // eslint-disable-next-line no-undef
      .pipe(gulp.dest(path.join(__dirname, 'public/css')))
  ); // Output RTL stylesheets.;
});

// gulp.task('sourcemap', () => {
//   return (
//     gulp
//       // eslint-disable-next-line no-undef
//       .src(path.join(__dirname, 'public/css/main.css'))
//       .pipe(sourcemaps.init())
//       // Perform other CSS processing here (e.g., autoprefixing, minification)
//       .pipe(sourcemaps.write('.'))
//       // eslint-disable-next-line no-undef
//       .pipe(gulp.dest(path.join(__dirname, 'public/css')))
//   );
// });

gulp.task('convert-rsuit-less-to-css', function () {
  return gulp.src('./public/css/rsuit.less').pipe(less()).pipe(gulp.dest('./public/css'));
});
gulp.task('all', gulp.series('convert-rsuit-less-to-css', 'create-rtl-css'));
