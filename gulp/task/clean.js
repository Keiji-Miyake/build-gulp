const del = require('del'); // ファイル削除
const config = require('../config');

function clean() {
  return del(`${config.dest.root}/*`);
};

exports.cleanTask = clean;
