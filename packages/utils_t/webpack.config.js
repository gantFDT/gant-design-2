const { merge } = require('webpack-merge');
const common = require('../../webpack.common.js');
const path = require('path');

const packageInfo = require('./package.json');

const filename = packageInfo.unpkg.substr(7);
const library = filename.substr(0, filename.length - 3);

module.exports = merge(common, {
  entry: path.resolve(__dirname, 'es/index.js'),
  output: {
    filename,
    library,
    path: path.resolve(__dirname, './dist'),
  },
});
