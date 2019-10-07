# gulp-builder

## 概要

sass,js,imagemin,iconfont

## 環境

* laravel5.5
* node.js: v10.16.3
* npm: 6.9.0

### node.jsのバージョン管理

環境欄にあるバージョンに合わせましょう。

* macの場合
  * https://qiita.com/tonkotsuboy_com/items/5322d226b6783d25b5df
* windowsの場合
  * https://qiita.com/ksh-fthr/items/fc8b015a066a36a40dc2

## 構成

```text
.
├── README.md
├── android-chrome-192x192.png
├── android-chrome-512x512.png
├── apple-touch-icon.png
├── browserconfig.xml
├── favicon-16x16.png
├── favicon-32x32.png
├── favicon.ico
├── gulp
│   ├── config
│   ├── config.js
│   ├── module
│   └── task
├── gulpfile.babel.js
├── index.php
├── laravel
│   ├── _ide_helper.php
│   ├── app
│   ├── artisan
│   ├── bootstrap
│   ├── composer.json
│   ├── composer.lock
│   ├── config
│   ├── database
│   ├── package.json
│   ├── phpspec.yml
│   ├── phpunit.xml
│   ├── readme.md
│   ├── resources
│   ├── server.php
│   ├── storage
│   ├── tests
│   ├── vendor
│   └── views
├── mstile-150x150.png
├── package.json
├── packages
│   ├── common.js
│   ├── gcalendar-holidays.js
│   ├── jquery.deserialize.min.js
│   ├── jquery.history.js
│   ├── jquery.serialize-object.min.js
│   ├── lightbox.js
│   ├── lightbox2
│   ├── phery.min.js
│   ├── purl.js
│   ├── spin.min.js
│   ├── sweetalert
│   ├── yahho-calendar.js
│   └── yjdmd5.js
├── res
│   ├── css
│   ├── font
│   ├── img
│   ├── js
│   └── sp
├── safari-pinned-tab.svg
├── site.webmanifest
├── src
│   ├── docs
│   ├── iconfont
│   ├── movie
│   ├── pc
│   ├── sp
│   ├── svg
│   └── vendor
├── yarn-error.log
└── yarn.lock


```

## フロントエンドビルド

### iconfontを使用する場合

2019/10/7現在、gulp-iconfont v10.0.3でエラーが発生するため、以下の修正をする。
https://github.com/svg/svgo/issues/1137

`/node_modules/svgo/.svgo.yml`を修正する。

```yaml
  - convertPathData
```

↓

```yaml
  - convertPathData:
      noSpaceAfterFlags: false
```

### 手順

1. プロジェクトルートディレクトリに移動
2. `yarn install` node_modulesディレクトリが作成されパッケージがインストールされます。
3. 上記の「iconfontを使用する場合を」参照し、修正する。
4. `yarn watch`で監視サーバーが起動します。ファイル変更する毎にリロードします。 `./gulp/config.js`のhostは環境に合わせてください。
5. pushする前に`yarn build`でファイルを生成し直してください。

### 個別タスク

`yarn sass`: sassビルドタスク実行
`yarn js`: jsビルドタスク実行
`yarn image`: 画像圧縮タスク実行
`yarn copy`: copyタスク実行 font/ movie/のコピー
`yarn iconfont`: iconfontタスク実行  src/iconfont/*.svgファイルからアイコンフォント作成

## コーディング規約

### HTML

### CSS

プリプロセッサにScssを使用
スタイリングはクラスにする。
設計はFLOCSSベース https://github.com/hiloki/flocss
文法チェック(stylelint) https://github.com/stylelint/stylelint
ルールはプロジェクトフォルダ直下の.stylelintrcに記述
スタイルガイド https://github.com/frontainer/frontnote

### JS

ESLintで文法チェック。 http://eslint.org/
ルールはプロジェクトフォルダ直下の.eslintrcに記述
除外する場合は .eslintignoreに記述

### iconfont

gulp-iconfontを使ってiconfont化
詳しくは https://www.npmjs.com/package/gulp-iconfont

design/icon.aiで作成しています。
500px以上で作ること
塗りつぶしは#000000
アイコンを複合パスにし、アウトライン化
別名保存・svg選択
svgの設定は gulp-iconfontのサイトを見てください。
sassファイルはsrc/docs/iconfont/style.scssをベースに
src/css/fundation/iconfontの中に生成されます。
