
const { task, series, src, dest } = require('gulp');

const { pushString } = require('../gulpfile.js')

task('index', function () {
  var target = src('../dist/index.html');
  return target
    .pipe(pushString('<link src="/gant-design-2/tantd.css">'))
    .pipe(dest('../dist'));
});

task('css', function () {
  var target = src('../packages/tantd/dist/tantd.css');
  return target
    .pipe(dest('../dist'));
});

exports.default = series(
  'index',
  'css'
);
