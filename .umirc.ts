export default {
  // ssr: {},
  mode: 'site',
  title: 'GantD',
  favicon: '/logo.png',
  logo: '/logo.png',
  publicPath: '/gant-design-2/',
  exportStatic: {},
  nodeModulesTransform: {
    type: 'none',
    exclude: [],
  },
  dynamicImport: {},
  manifest: {},
  hash: true,
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
      'antd',
    ],
    [
      'babel-plugin-import',
      {
        libraryName: 'tantd',
        libraryDirectory: 'lib',
        style: true,
      },
      'tantd',
    ],
  ],
  resolve: {
    includes: ['docs', 'packages/tantd/src', 'packages/utils/src', 'style'],
  },
  links: [],
  navs: [
    null,
    {
      title: 'GitHub',
      path: 'https://github.com/umijs/dumi-template',
    },
  ],
  headScripts: [],
};
