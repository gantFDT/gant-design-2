const { merge } = require('webpack-merge');
const common = require('../../webpack.common.js');
const path = require('path');

module.exports = merge(common, {
  entry: path.resolve(__dirname, 'es/index.js'),
  output: {
    filename: 'tantd.js',
    library: 'tantd',
    path: path.resolve(__dirname, './dist'),
  },
});
