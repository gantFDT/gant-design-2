
const { task, series, src, dest } = require('gulp');
const inject = require('gulp-inject-string');

task('index-inject', function () {
  var target = src('../dist/index.html');
  return target
    .pipe(inject.after('</title>', '\n<link rel="stylesheet" type="text/css" href="/gant-design-2/tantd.css">\n'))
    .pipe(dest('../dist'));
});

task('css-copy', function () {
  var target = src('../packages/tantd/dist/tantd.css');
  return target
    .pipe(dest('../dist'));
});

exports.default = series(
  'index-inject',
  'css-copy'
);
