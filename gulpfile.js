const { task, series, src, dest } = require('gulp');
const babel = require('gulp-babel');
const ts = require('gulp-typescript');
const del = require('del');
const less = require('gulp-less');
const through2 = require('through2');

//给组件中追加引入css
const pushCss = () => {
  return through2.obj(function (file, encoding, next) {
    this.push(file.clone());
    if (file.path.match(/(\/|\\)src(\/|\\)([a-z]*-[a-z]*|[a-z]*)(\/|\\)index\.js/)) {
      let content = file.contents.toString(encoding);
      file.contents = Buffer.from((content += `\nrequire('./style/index.css');`));
    }
    this.push(file);
    next();
  });
};

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

//清除编译制品
task('clean', async function () {
  await del('lib/**');
  await del('es/**');
  await del('dist/**');
});

//生成lib包
task('cjs', function () {
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
    .pipe(pushCss())
    .pipe(dest('lib/'));
});

//生成es module
task('es', function () {
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
    .pipe(pushCss())
    .pipe(dest('es/'));
});

//处理less样式文件
task('less', function () {
  return src('src/**/*.less').pipe(less()).pipe(dest('es/')).pipe(dest('lib/'));
});

//拷贝json文件
task('json', function () {
  return src('src/**/*.json').pipe(dest('es/')).pipe(dest('lib/'));
});

//处理ts声明
task('declaration', function () {
  try {
    const tsProject = ts.createProject('tsconfig.json', {
      declaration: true,
      // noEmitOnError: true,
      // emitDeclarationOnly: true,
    });
    return tsProject.src().pipe(tsProject()).pipe(less2css()).pipe(pushCss()).pipe(dest('es/')).pipe(dest('lib/'));
  } catch (error) {
    console.log(error);
  }
});

//拷贝readme
task('copyReadme', async function () {
  await src('../../README.md').pipe(dest('../../packages/tantd'));
});

exports.default = series('clean', 'cjs', 'es', 'less', 'json', 'declaration', 'copyReadme');
