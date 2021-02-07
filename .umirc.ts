export default {
  // ssr: {},
  mode: 'site',
  title: 'GantD',
  favicon: 'https://i.loli.net/2021/02/07/KRZuGH3JgU8hCxs.png',
  logo: 'https://i.loli.net/2021/02/07/KRZuGH3JgU8hCxs.png',
  publicPath: '/gant-design-2/',
  base: '/gant-design-2/',
  exportStatic: {},
  nodeModulesTransform: {
    type: 'none',
    exclude: [],
  },
  dynamicImport: {},
  manifest: {},
  hash: true,
  locales: [['zh-CN', '中文']],
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
        libraryDirectory: 'es',
        style: true,
      },
      'tantd',
    ],
  ],
  // alias: {
  //   tantd: path.resolve(__dirname, 'packages/tantd'),
  // },
  resolve: {
    includes: ['docs', 'packages/tantd/src', 'packages/utils/src', 'style'],
  },
  links: [],
  navs: [
    null,
    {
      title: 'GitHub',
      path: 'https://github.com/gantFDT/gant-design-2',
    },
  ],
  headScripts: [],
  styles: [
    `
    .__dumi-default-layout-hero{
      background-image:url(https://i.loli.net/2021/02/07/D95R2L8pzy1bjCU.png)!important;
      background-size:cover;
      background-repeat:no-repeat;
    }
    .__dumi-default-layout-hero h1{
      color:#fff!important;
    }
    .__dumi-default-layout-hero .markdown p{
      color:#fff!important;
    }
    `
  ]
};
