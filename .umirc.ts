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
      title: '-',
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
    .__dumi-default-navbar nav > span:last-child{
      background-image: url(https://img.shields.io/github/stars/gantFDT/gant-design?style=social);
      background-repeat: no-repeat;
      background-position: center;
      width: 100px;
    }
    .__dumi-default-navbar nav > span:last-child a{
      opacity:0;
    }
    table {
      table-layout:fixed;
      width: 100%;
      max-width: 100%;
      border: 1px solid #dedede;
      margin: 15px auto;
      border-collapse: collapse;
      empty-cells: show;
    }
    table th,
    table td {
      height: 35px;
      border: 1px solid #dedede;
      word-wrap:break-word;
      padding: 0 10px;
    }
    table th {
      font-weight: bold;
      background: rgba(158,188,226,0.2);
      word-wrap:break-word;
    }
    table tbody tr:nth-child(2n) {
      background: rgba(158,188,226,0.12);
    }
    table td:nth-child(1) {
      word-wrap:break-word;
    }
    table tr:hover {
      background: #efefef;
    }
    .table-area {
      overflow: auto;
    }
    `,
  ],
};
