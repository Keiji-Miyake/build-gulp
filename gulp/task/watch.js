const path = require('path');
const gulp = require('gulp');
const browserSync = require('browser-sync').create();

const config = require('../config');

/**
 * @method watchTask
 * ejsタスク
 * @param {any} gulp
 */

function serverBuild(callback) {
  browserSync.init({
    proxy: config.host,
    files: [
      path.resolve('laravel/view/**/*.blade.php'),
      `${config.dest.root}/**/*`
    ],
    reloadOnRestart: true
  });
  callback();
  console.log("Server was launched");
}

function serverReload(callback) {
  browserSync.reload();
  callback();
  console.log('Browser reload completed');
}

function watch(callback) {
  gulp.watch(`${config.src.css.pc}/**/*.scss`, gulp.series('sass_pc'));
  gulp.watch(`${config.src.css.sp}/**/*.scss`, gulp.series('sass_sp'));

  gulp.watch(`${config.src.js.pc}/**/*.js`, gulp.series('js_pc'));
  gulp.watch(`${config.src.js.sp}/**/*.js`, gulp.series('js_sp'));

  gulp.watch(`${config.src.img.pc}/**/*.{jpg,jpeg,png,gif,svg}`, gulp.series('image_pc'));
  gulp.watch(`${config.src.img.sp}/**/*.{jpg,jpeg,png,gif,svg}`, gulp.series('image_sp'));

  gulp.watch(`${config.src.iconfont}/*.svg`, gulp.series('iconfont', 'reload'));
  gulp.watch([`${config.src.font}/**/*`,`${config.src.movie}/**/*`], gulp.series('copy', 'reload'));

  callback();
}

exports.watchTask = gulp.series(serverBuild, watch);
exports.serverReloadTask = serverReload;
