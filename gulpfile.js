const gulp = require('gulp'),
    sass = require('gulp-sass')(require('node-sass')),
    browserSync = require('browser-sync').create(),
    autoprefixer = require('gulp-autoprefixer'),
    beautify = require('gulp-beautify'),
    rename = require('gulp-rename'),
    cleanCSS = require('gulp-clean-css'),
    sourcemaps = require('gulp-sourcemaps');

function generateStyles() {
    return gulp.src('./src/scss/**/*.scss')
                .pipe(sourcemaps.init())
                .pipe(sass().on('error', sass.logError))
                .pipe(autoprefixer('last 4 version'))
                .pipe(beautify.css({ indent_size: 4 }))
                .pipe(gulp.dest('./dist/css'))
                .pipe(cleanCSS({ compatibility: 'ie8'}))
                .pipe(rename({ suffix: '.min' }))
                .pipe(sourcemaps.write('maps/'))
                .pipe(gulp.dest('./dist/css'));      
}

function watch() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    gulp.watch('./src/scss/**/*.scss', generateStyles);
    gulp.watch('./*.html')
        .on('change', browserSync.reload);
    gulp.watch('./src/js/**/*.js')
        .on('change', browserSync.reload);
}

exports.watch = watch;