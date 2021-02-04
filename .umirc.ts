export default {
  // ssr: {},
  exportStatic: {},
  nodeModulesTransform: {
    type: 'none',
    exclude: [],
  },
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
  mode: 'site',
  title: 'GantD',
  favicon: '/logo.png',
  logo: '/logo.png',
  dynamicImport: {},
  manifest: {},
  hash: true,
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
