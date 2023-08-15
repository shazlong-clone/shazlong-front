var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var rtlcss = require('gulp-rtlcss');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('styles', function () {
    return gulp.src(['./src/assets/css/main.css'])
		.pipe(sourcemaps.init())
        .pipe(autoprefixer(["last 2 versions", "> 1%"])) // Other post-processing.
        .pipe(gulp.dest('dist')) // Output LTR stylesheets.
        .pipe(rtlcss()) // Convert to RTL.
        .pipe(rename({ suffix: '-rtl' })) // Append "-rtl" to the filename.
		.pipe(sourcemaps.write('dist')) // Output source maps.
        .pipe(gulp.dest('dist')); // Output RTL stylesheets.
});