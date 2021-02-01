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

//把流中的less后缀改为css
const less2css = () => {
  return through2.obj(function (file, encoding, next) {
    this.push(file.clone());
    const content = file.contents.toString(encoding);
    file.contents = Buffer.from(content.replace(/\.less/g, '.css'));
    this.push(file);
    next();
  });
};

//处理less样式文件
gulp.task('less', function () {
  return gulp
    .src('src/**/*.less')
    .pipe(less())
    .pipe(gulp.dest('es/'))
    .pipe(gulp.dest('lib/'));
});

//处理ts声明
gulp.task('declaration', function () {
  const tsProject = ts.createProject('tsconfig.json', {
    declaration: true,
    emitDeclarationOnly: true,
  });
  return tsProject
    .src()
    .pipe(tsProject())
    .pipe(less2css())
    .pipe(gulp.dest('es/'))
    .pipe(gulp.dest('lib/'));
});

//拷贝readme
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
