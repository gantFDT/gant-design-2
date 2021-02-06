export default {
  // ssr: {},
  mode: 'site',
  title: 'GantD',
  favicon: 'https://lark-assets-prod-aliyun.oss-cn-hangzhou.aliyuncs.com/yuque/0/2021/png/133058/1612508061623-resources/11026360/png/71306cd3-ca5a-41ca-9e43-5febd66c233f.png?OSSAccessKeyId=LTAI4GGhPJmQ4HWCmhDAn4F5&Expires=1612509864&Signature=z6Kkn5sbJ01sjIAGxII4DabOLLo%3D',
  logo: 'https://lark-assets-prod-aliyun.oss-cn-hangzhou.aliyuncs.com/yuque/0/2021/png/133058/1612508061623-resources/11026360/png/71306cd3-ca5a-41ca-9e43-5febd66c233f.png?OSSAccessKeyId=LTAI4GGhPJmQ4HWCmhDAn4F5&Expires=1612509864&Signature=z6Kkn5sbJ01sjIAGxII4DabOLLo%3D',
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
      background-image:url(https://lark-assets-prod-aliyun.oss-cn-hangzhou.aliyuncs.com/yuque/0/2021/png/133058/1612510268024-resources/11026360/png/8798cd1c-8d2c-4efe-ac42-a9331c045423.png?OSSAccessKeyId=LTAI4GGhPJmQ4HWCmhDAn4F5&Expires=1612512072&Signature=qvXSTSsho4mB6OUo%2BdyRK1A6qXE%3D)!important;
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
