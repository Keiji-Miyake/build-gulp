const path = require('path');
const env = process.env.NODE_ENV || 'development';

const host = "local.proto.bukken1-web.xyz.com:8080";
const dir = {
  src: 'src',
  dest: 'dist',
  pc: 'pc',
  sp: 'sp',
  doc: 'docs',
  css: 'css',
  js: 'js',
  img: 'img',
  iconfont: 'iconfont',
  svg: 'svg',
  font: 'font',
  movie: 'movie'
};

const paths = {
  src: path.resolve(dir.src),
  dest: path.resolve(dir.dest),
};

module.exports = {
  env,
  host,
  dir,
  src: {
    root: paths.src,
    doc: path.join(paths.src, dir.doc),
    css: {
      pc: path.join(paths.src, dir.pc, dir.css),
      sp: path.join(paths.src, dir.sp, dir.css)
    },
    js: {
      pc: path.join(paths.src, dir.pc, dir.js),
      sp: path.join(paths.src, dir.sp, dir.js)
    },
    img: {
      pc: path.join(paths.src, dir.pc, dir.img),
      sp: path.join(paths.src, dir.sp, dir.img)
    },
    iconfont: path.join(paths.src, dir.iconfont),
    svg: path.join(paths.src, dir.svg),
    font: path.join(paths.src, dir.font),
    movie: path.join(paths.src, dir.movie)
  },
  dest: {
    root: paths.dest,
    css: {
      pc: path.join(paths.dest, dir.css),
      sp: path.join(paths.dest, dir.sp, dir.css)
    },
    js: {
      pc: path.join(paths.dest, dir.js),
      sp: path.join(paths.dest, dir.sp, dir.js)
    },
    img: {
      pc: path.join(paths.dest, dir.img),
      sp: path.join(paths.dest, dir.sp, dir.img)
    },
    svg: path.join(paths.dest, dir.svg),
    font: path.join(paths.dest, dir.font),
    movie: path.join(paths.dest, dir.movie)
  }
};
