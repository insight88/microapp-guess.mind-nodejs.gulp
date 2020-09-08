import gulp from 'gulp';
import sass from 'gulp-sass';

const paths = {
  styles: {
    src: 'assets/scss/styles.scss',
    dest: 'src/static/styles',
  },
};

export function styles() {
  return (
    gulp
      .src(paths.styles.src)
      // * gulp.src() : 변환할 source 파일의 경로
      .pipe(sass())
      // * 소스 파일을 pipe할 방법을 지정
      .pipe(gulp.dest(paths.styles.dest))
    // * gulp가 sass로 pipe한 파일이 저장될 dest 경로
  );
}
