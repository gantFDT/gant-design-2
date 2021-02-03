const { series, src, task, dest } = require('gulp');
const commonConfig = require('../../gulpfile');
const packageInfo = require('./package.json');

task('extraModule', async function () {
  for (let module of packageInfo.extraModule) {
    const moduleLib = `../${module}/lib/**`;
    await src(moduleLib).pipe(dest(`./lib/${module}`));
    const moduleES = `../${module}/es/**`;
    await src(moduleES).pipe(dest(`./es/${module}`));
  }
});

exports.default = series(commonConfig.default, 'extraModule');
