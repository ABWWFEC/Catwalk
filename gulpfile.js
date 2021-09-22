const { src, dest, watch } = require('gulp');
const minifyJs = require('gulp-uglify');
const sourceMaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const concat = require('gulp-concat');

const bundleJs = () => {
  return src('./client/dist/**/*.js')
  .pipe(babel({
    presets: ['@babel/preset-env', '@babel/preset-react'],
  }))
    .pipe(sourceMaps.init())
    .pipe(minifyJs())
    .pipe(concat('bundleTest.js'))
    .pipe(sourceMaps.write())
    .pipe(dest('./client/dist/'));
}

const devWatch = () => {
  watch('./client/dist/**/*.js', bundleJs);
}

exports.default = bundleJs;