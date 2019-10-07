const fs = require('fs'); // ファイルシステム
const path = require('path'); // path module
/**
 * 内包するフォルダ一覧を取得
 * @param {*} dirPath
 */
module.exports = function getFolders(dir) {
  try {
    return fs.readdirSync(dir).filter((file) => {
      return fs.statSync(path.join(dir, file)).isDirectory();
    });
  } catch (err) {
    return false;
  }
};

