const gulp = require('gulp');

function build(callback) {
  // gulp.series('clean', 'copy', 'iconfont', gulp.parallel('sass', 'js', 'image'));
  gulp.series(clean);
  callback();
}

exports.buildTask = build;
