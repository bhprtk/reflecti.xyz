'use strict';

const gulp = require('gulp');

const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

const sass = require('gulp-sass');
const minCSS = require('gulp-clean-css');

const minHTML = require('gulp-htmlmin');

const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const del = require('del');

const nodemon = require('gulp-nodemon');

/////// GENERAL TASKS /////////

gulp.task('default', ['build', 'watch', 'serve']);

gulp.task('build', ['html', 'js', 'css']);

gulp.task('watch', ['watch.html', 'watch.js', 'watch.css']);

gulp.task('serve', () => {
  nodemon({
    ignore: ['client', 'public', 'Gulpfile.js']
  });
});

//////////// HTML //////////////
gulp.task('watch.html', () => {
  return gulp.watch('./client/**/html/*.html', ['html']);
});

gulp.task('html', ['clean.html'], () => {
  return gulp.src('./client/**/html/*.html')
  .pipe(plumber())
  .pipe(minHTML({collapseWhitespace: true}))
  .pipe(gulp.dest('./public/assets'));
});


/////// JAVASCRIPT /////////
gulp.task('watch.js', () => {
  return gulp.watch('./client/**/js/*.js', ['js']);
});

gulp.task('js', ['clean.js'], () => {
  return gulp.src('./client/**/js/*.js')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/assets'));
});


//////////// CSS //////////////
gulp.task('watch.css', () => {
  return gulp.watch('./client/assets/**/css/**', ['css']);
});

gulp.task('css', ['clean.css'], () => {
  return gulp.src(['./client/**/css/*.scss',
                   './client/**/css/*.sass'])
    .pipe(plumber())
    .pipe(sass())
    .pipe(minCSS())
    .pipe(gulp.dest('./public/assets'));
});


//////////// DELETE BEFORE BUILD //////////////
gulp.task('clean.html', () => {
  return del('./public/assets/**/html/*.html');
});

gulp.task('clean.js', () => {
  return del('./public/assets/**/js/*.js');
});

gulp.task('clean.css', () => {
  return del('./public/assets/**/css/*.css');
});
