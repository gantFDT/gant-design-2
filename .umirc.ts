export default {
  // ssr: {},
  mode: 'site',
  title: 'GantD',
  favicon: 'https://upload.zcool.com.cn/image/12663712/3/community/015810601eaeb711013f79282623d5.png@1280w_1l_2o_100sh.png',
  logo: 'https://upload.zcool.com.cn/image/12663712/3/community/015810601eaeb711013f79282623d5.png@1280w_1l_2o_100sh.png',
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
      background-image:url(https://6669-financial-4gjj573w836c3925-1255796665.tcb.qcloud.la/01c29ee3bc3f7370de0dbbd754383b9f.png?sign=7c155f7e01eb4623a72362c4003c8a1a&t=1612661788)!important;
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
