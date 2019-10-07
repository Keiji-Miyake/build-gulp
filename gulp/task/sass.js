const {src, dest, parallel} = require('gulp');

const browserSync = require('browser-sync');
const plumber = require('gulp-plumber');
const size = require('gulp-size');
const sass = require('gulp-sass');
const autoprefixer = require('autoprefixer');
const sassGlob = require('gulp-sass-glob');
const sassImporter = require('sass-module-importer');
const postcss = require('gulp-postcss');
const normalize = require('postcss-normalize');
const flexBugsFixes = require('postcss-flexbugs-fixes');

const notify = require('../module/notify');
const config = require('../config');

function sass_pc() {
  return src(`${config.src.css.pc}/**/*.scss`, {sourcemaps: true})
    .pipe(plumber({
      errorHandler: function(error) {
        notify('sass:pc', error);
        this.emit('end');
      }
    }))
    .pipe(sassGlob())
    .pipe(sass({
      importer: sassImporter(),
      outputStyle: 'compressed',
      precision: 10
    }))
    .pipe(postcss([
      normalize(),
      flexBugsFixes,
      autoprefixer({
        "grid": true,
      })
    ]))
    .pipe(size({
      showFiles: true
    }))
    .pipe(dest(config.dest.css.pc, {sourcemaps: './maps'}))
    .pipe(browserSync.stream());
}

function sass_sp() {
  return src(`${config.src.css.sp}/**/*.scss`, {sourcemaps: true})
    .pipe(plumber({
      errorHandler: function(error) {
        notify('sass:sp', error);
        this.emit('end');
      }
    }))
    .pipe(sassGlob())
    .pipe(sass({
      importer: sassImporter(),
      outputStyle: 'compressed',
      precision: 10
    }))
    .pipe(postcss([
      normalize(),
      flexBugsFixes,
      autoprefixer({
        "grid": true,
      })
    ]))
    .pipe(size({
      showFiles: true
    }))
    .pipe(dest(config.dest.css.sp, {sourcemaps: './maps'}))
    .pipe(browserSync.stream());
}

exports.sassTask = parallel(sass_pc, sass_sp);
exports.sassPcTask = sass_pc;
exports.sassSpTask = sass_sp;
