const gulp = require('gulp');
const plumber = require('gulp-plumber'); // エラーでタスクが強制停止するのを防止
const newer = require('gulp-newer'); // 変更したファイルのみ実行する
const size = require('gulp-size'); // 変更したファイルのサイズを表示
const browserSync = require('browser-sync'); // ローカルサーバー

const notify = require('../module/notify');
const config = require('../config');

function copyTask() {
  return gulp.src([
    `${config.src.font}/**/*`,
    `${config.src.movie}/**/*`,
  ], {base: config.src.root})
    .pipe(plumber({
      errorHandler: (error) => {
        notify('copy', error);
      }
    }))
    .pipe(newer(config.dest.root))
    .pipe(gulp.dest(config.dest.root))
    .pipe(size({
      showFiles: true
    }))
    .pipe(browserSync.stream({once: true}));
}

exports.copyTask = copyTask;
