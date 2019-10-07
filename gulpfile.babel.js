/* eslint-qqdisable import/no-extraneous-dependencies */

import gulp from 'gulp';

const { sassTask, sassPcTask, sassSpTask } = require('./gulp/task/sass');
const { jsTask, jsPcTask, jsSpTask } = require('./gulp/task/js');
const { imageTask, imagePcTask, imageSpTask } = require('./gulp/task/image');
const { iconfontTask } = require('./gulp/task/iconfont');
const { copyTask } = require('./gulp/task/copy');
const { cleanTask } = require('./gulp/task/clean');
const { watchTask, serverReloadTask } = require('./gulp/task/watch');

exports.sass = sassTask;
exports.sass_pc = sassPcTask;
exports.sass_sp = sassSpTask;

exports.js = jsTask;
exports.js_pc = jsPcTask;
exports.js_sp = jsSpTask;

exports.image = imageTask;
exports.image_pc = imagePcTask;
exports.image_sp = imageSpTask;

exports.iconfont = iconfontTask;
exports.copy = copyTask;
exports.clean = cleanTask;

exports.build = gulp.series(cleanTask, copyTask, iconfontTask,
  gulp.parallel(sassTask, jsTask, imageTask));
exports.watch = watchTask;
exports.reload = serverReloadTask;
