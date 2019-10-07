const gulp = require('gulp');
const iconfont = require('gulp-iconfont');
const consolidate = require('gulp-consolidate'); // 統合テンプレートエンジン
const plumber = require('gulp-plumber'); // エラーでタスクが強制停止するのを防止
const size = require('gulp-size'); // 変更したファイルのサイズを表示
const rename = require('gulp-rename'); // ファイル名変更
const svgmin = require('gulp-svgmin'); // svg最適化

const notify = require('../module/notify');
const config = require('../config');

function iconfontTask() {
  const font = {
    name: 'myiconfont',
    class: 'if',
    stamp: Math.round(Date.now() / 1000)
  };

  return gulp.src(`${config.src.iconfont}/*.svg`)
    .pipe(plumber(
      {
        errorHandler: (error) => {
          notify('iconfont', error);
        }
      }
    ))
    .pipe(svgmin())
    .pipe(iconfont({
      appendUnicode: false, // recommended option
      centerHorizontally: true,
      fontName: font.name,
      fontheight: 1001,
      formats: ['ttf', 'eot', 'woff', 'woff2', 'svg'],
      normalize: true,
      timestamp: font.stamp
    }))
    .on('glyphs', function(glyphs) {
      gulp.src(`${config.src.doc}/${config.dir.iconfont}/style.scss`)
        .pipe(consolidate('lodash', {
          glyphs: glyphs,
          fontName: font.name,
          fontPath: `/${config.dir.dest}/${config.dir.font}/`,
          className: font.class
        }))
        .pipe(rename({
          basename: `_${font.name}`
        }))
        .pipe(gulp.dest(`${config.src.css.pc}/foundation/${config.dir.iconfont}/`));
    })
    // @TODO sizeを実行すると出力ファイルが0バイトになってしまう
    // .pipe(size({
    //   showFiles: true
    // }))
    .pipe(gulp.dest(config.dest.font));
};

exports.iconfontTask = iconfontTask;
