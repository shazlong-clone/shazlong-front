var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var rtlcss = require('gulp-rtlcss');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var cssimport = require('gulp-cssimport');


gulp.task('styles', function () {
    return gulp.src(['./src/index.css'])
        .pipe(cssimport({
            filter: /^http:\/\//gi // exclude only http urls
        }))
		.pipe(sourcemaps.init())
        .pipe(autoprefixer(["last 2 versions", "> 1%"])) // Other post-processing.
        .pipe(gulp.dest('./src/assets/css')) // Output LTR stylesheets.
        .pipe(rtlcss()) // Convert to RTL.
        .pipe(rename({ suffix: '-rtl' })) // Append "-rtl" to the filename.
		.pipe(sourcemaps.write('./src/assets/css')) // Output source maps.
        .pipe(gulp.dest('./src/assets/css')); // Output RTL stylesheets.
});