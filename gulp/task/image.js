const gulp = require('gulp');
const browserSync = require('browser-sync'); // ローカルサーバー
const plumber = require('gulp-plumber'); // エラーでタスクが強制停止するのを防止
const image = require('gulp-imagemin'); // 画像最適化
const mozjpeg = require('imagemin-mozjpeg');
const pngquant = require('imagemin-pngquant');

const config = require('../config');

function image_pc() {
  return gulp.src(
    `${config.src.img.pc}/**/*.{jpg,jpeg,png,gif,svg}`,
    {
      since: gulp.lastRun(image_pc)
    })
    .pipe(plumber({
      errorHandler: function(error) {
        notify('image:pc', error);
        this.emit('end');
      }
    }))
    .pipe(image([
      pngquant({
        quality: [0.7, 0.85]
      }),
      mozjpeg({
        quality: 85
      }),
      image.gifsicle(),
      image.svgo()
    ]))
    .pipe(gulp.dest(config.dest.img.pc))
    .pipe(browserSync.stream({once: true}));
}

function image_sp(callback) {
  return gulp.src(
    `${config.src.img.sp}/**/*.{jpg,jpeg,png,gif,svg}`,
    {
      since: gulp.lastRun(image_sp)
    })
    .pipe(plumber({
      errorHandler: function(error) {
        notify('image:sp', error);
        this.emit('end');
      }
    }))
    .pipe(image([
      pngquant({
        quality: [0.7, 0.85]
      }),
      mozjpeg({
        quality: 85
      }),
      image.gifsicle(),
      image.svgo()
    ]))
    .pipe(gulp.dest(config.dest.img.sp))
    .pipe(browserSync.stream({once: true}));
}

exports.imageTask = gulp.parallel(image_pc, image_sp);
exports.imagePcTask = image_pc;
exports.imageSpTask = image_sp;
