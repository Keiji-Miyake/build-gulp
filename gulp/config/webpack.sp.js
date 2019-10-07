const glob = require('glob');
const webpack = require('webpack');

const config = require('../config');

/**
 * webpack エントリー生成
 * [_]のつかないファイルを抽出し、エントリーポイントに追加する。
 * venderディレクトリは除外
 */
const entries = glob.sync('**/*.js', {
  ignore: ['**/_*.js', 'vendor/**/*'],
  cwd: config.src.js.sp
});

/**
 * webpack設定
 */
const webpackConfig = {
  mode: config.env === 'test' ? 'development' : config.env,
  cache: true,
  entry: entries,
  output: {
    filename: '[name].bundle.js', // [name], [hash]
    path: config.dest.js.sp,
  },
  resolve: {
    extensions: [".js"],
    modules: [
      'node_modules',
      config.src.js.sp
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader'
        }]
      },
      {
        test: require.resolve('jquery'),
        use: [{
          loader: 'expose-loader',
          options: 'jQuery'
        }, {
          loader: 'expose-loader',
          options: '$'
        }]
      }
    ]
  },
  optimization: {
    splitChunks: {
      name: 'vendor',
      chunks: 'initial'
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      "window.$": "jquery",
      "window.jQuery": "jquery",
    })
  ]
};

if(Object.keys(entries).length === 0) {
  module.exports = false;
} else {
  module.exports = webpackConfig;
}

