const {dest, parallel} = require('gulp');
const browserSync = require('browser-sync'); // ローカルサーバー
const webpack = require('webpack');
const webpackStream = require('webpack-stream'); // webpackのgulp用プラグイン

const config = require('../config');

function js_pc(callback) {
  const webpackConfig = require('../config/webpack');
  if(!webpackConfig) {
    callback();
  }

  return webpackStream(webpackConfig, webpack)
    .pipe(dest(config.dest.js.pc))
    .pipe(browserSync.stream({once: true}));
}

function js_sp(callback) {
  const webpackConfig = require('../config/webpack.sp');
  if(!webpackConfig) {
    callback();
  }

  return webpackStream(webpackConfig, webpack)
    .pipe(dest(config.dest.js.sp))
    .pipe(browserSync.stream({once: true}));
}

exports.jsTask = parallel(js_pc, js_sp);
exports.jsPcTask = js_pc;
exports.jsSpTask = js_sp;
