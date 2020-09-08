// ! 파일이름이 gulpfile(.babel).js 이유
// ! .babel이 붙어있으면 .babelrc 설정대로 이 파일을 알아서 compile 해준다

import gulp from 'gulp';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import minifyCSS from 'gulp-csso';
import del from 'del';
import browserify from 'gulp-browserify';
import babel from 'babelify';

sass.compiler = require('node-sass');

const paths = {
  styles: {
    src: 'assets/scss/styles.scss',
    dest: 'src/static/styles',
    watch: 'assets/scss/**/*.scss',
  },
  js: {
    src: 'assets/js/main.js',
    dest: 'src/static/js',
    watch: 'assets/js/**/*.js',
  },
};

const clean = () => del(['src/static']);

const styles = () =>
  gulp
    .src(paths.styles.src)
    // * gulp.src() : 변환할 source 파일의 경로
    .pipe(sass())
    // * gulp-sass 모듈을 사용하여 scss를 css로 compile
    .pipe(
      autoprefixer({
        overrideBrowserslist: ['last 2 versions'],
        cascade: false,
      })
    )
    .pipe(minifyCSS())
    // * 소스 파일을 pipe할 방법을 지정
    // * autoprefixer를 거친 후 minified css로 compile한다
    .pipe(gulp.dest(paths.styles.dest));
// * gulp가 sass로 pipe한 파일이 저장될 dest 경로

const js = () =>
  gulp
    .src(paths.js.src)
    .pipe(
      browserify({
        transform: [
          babel.configure({
            presets: ['@babel/preset-env'],
          }),
        ],
      })
    )
    .pipe(gulp.dest(paths.js.dest));

const watchFiles = () => {
  gulp.watch(paths.styles.watch, styles);
  gulp.watch(paths.js.watch, js);
};
// * gulp.watch(route, method) : route를 watch하다가 변화가 생길 때 method를 호출

const dev = gulp.series(clean, styles, js, watchFiles);

export const build = gulp.series(clean, styles, js);

export default dev;
