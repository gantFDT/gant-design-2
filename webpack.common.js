const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const merge = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
// const WebpackBar = require('webpackbar');
const webpack = require('webpack');

// const pkg = require('./package.json');

// const entry = ['./index'];
const libName = 'tantd';
const exts = ['.ts', '.tsx', '.js', '.jsx', '.css'];

module.exports = {
  mode: 'production',
  // entry: {
  //     [`${libName}.min`]: entry,
  // },
  // output: {
  //     path: path.resolve(__dirname, 'dist'),
  //     filename: '[name].js',
  //     library: libName,
  //     libraryTarget: 'umd',
  // },
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
    },
    'lodash-es': {
      root: '_',
      commonjs: 'lodash-es',
      commonjs2: 'lodash-es',
      amd: 'lodash-es',
    },
  },
  resolve: {
    extensions: exts,
  },
  devtool: 'source-map',
  devServer: {
    contentBase: './dist',
    port: 8080,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
        // exclude: __dirname + 'node_modules',
        // include: __dirname + 'src',
        // options: { presets: ['env'] }
      },
      // {
      //     test: /\.tsx?$/,
      //     exclude: /node_modules/,
      //     use: [
      //         {
      //             loader: 'babel-loader',
      //         },
      //         {
      //             loader: 'ts-loader',
      //             options: {
      //                 configFile: 'tsconfig.json',
      //             },
      //         },
      //     ],
      // },
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',

            options: {
              importLoaders: 1,
              // sourceMap: true,
              // modules: true,
            },
          },
          {
            loader: 'postcss-loader',
          },
        ],
      },
      // {
      //     test: /\.less$/,
      //     exclude: /node_modules/,
      //     use: [
      //         MiniCssExtractPlugin.loader,
      //         {
      //             loader: 'css-loader',
      //             options: {
      //                 sourceMap: true,
      //                 modules: true,
      //             },
      //         },
      //         {
      //             loader: 'postcss-loader',
      //         },
      //         {
      //             loader: 'less-loader',
      //         },
      //     ],
      // },
    ],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new MiniCssExtractPlugin({
      filename: `${libName}.css`,
    }),

    // new BundleAnalyzerPlugin({
    //     analyzerMode: 'static',
    //     openAnalyzer: false,
    //     reportFilename: '../report.html',
    // }),
  ],
};
