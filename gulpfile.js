const gulp = require('gulp');
const babel = require('gulp-babel');
const ts = require('gulp-typescript');
const del = require('del');
const less = require('gulp-less');
const sourcemaps = require('gulp-sourcemaps');
const through2 = require('through2');

//清除编译制品
gulp.task('clean', async function () {
  await del('lib/**');
  await del('es/**');
  await del('dist/**');
});

//生成lib包
gulp.task('cjs', function () {
  const tsProject = ts.createProject('tsconfig.json', {
    module: 'CommonJS',
  });
  return tsProject
    .src()
    .pipe(tsProject())
    .pipe(
      babel({
        configFile: '../../.babelrc',
      }),
    )
    .pipe(less2css())
    .pipe(gulp.dest('lib/'));
});

//生成es module
gulp.task('es', function () {
  const tsProject = ts.createProject('tsconfig.json', {
    module: 'ESNext',
  });
  return tsProject
    .src()
    .pipe(tsProject())
    .pipe(
      babel({
        configFile: '../../.babelrc',
      }),
    )
    .pipe(less2css())
    .pipe(gulp.dest('es/'));
});

//
const less2css = () => {
  return through2.obj(function (file, encoding, next) {
    this.push(file.clone());
    // if (file.path.match(/(\/|\\)style(\/|\\)index\.js/)) {
    const content = file.contents.toString(encoding);
    file.contents = Buffer.from(content.replace(/\.less/g, '.css'));
    // file.path = file.path.replace(/index\.js/, 'css.js');
    this.push(file);
    next();
  });
};

gulp.task('less', function () {
  return gulp
    .src('src/**/*.less')
    .pipe(less())
    .pipe(gulp.dest('es/'))
    .pipe(gulp.dest('lib/'));

  // gulp.src('src/**/*.less')
  //   .pipe(sourcemaps.init())
  //   .pipe(less())
  //   .pipe(sourcemaps.write())
  //   .pipe(gulp.dest('style'));
  // gulp.watch('src/**/*.less', ['Less']); //当所有less文件发生改变时，调用Less任务
});

gulp.task('declaration', function () {
  const tsProject = ts.createProject('tsconfig.json', {
    declaration: true,
    emitDeclarationOnly: true,
  });
  return tsProject
    .src()
    .pipe(tsProject())
    .pipe(gulp.dest('es/'))
    .pipe(gulp.dest('lib/'));
});

gulp.task('copyReadme', async function () {
  await gulp.src('../../README.md').pipe(gulp.dest('../../packages/tantd'));
});

exports.default = gulp.series(
  'clean',
  'cjs',
  'es',
  'less',
  'declaration',
  'copyReadme',
);
