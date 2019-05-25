module.exports = {
  baseUrl: process.env.NODE_ENV === 'production' ? '/' : '/',
  outputDir: 'dist',
  assetsDir: 'static',
  filenameHashing: true,
  pages: {
    index: {
      entry: 'src/pages/index/index.js',
      template: 'src/pages/index/index.html',
      filename: 'index.html',
      title: 'List', // 需设置public/index.html的title标签
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  },
  lintOnSave: 'error',
  runtimeCompiler: false,
  transpileDependencies: [], // 让babel转译node_modules下的依赖
  productionSourceMap: false,
  configureWebpack: (config) => {
  },
  chainWebpack: (config) => {
  },
  css: {
    modules: false,
    extract: true,
    sourceMap: false,
    loaderOptions: {
      css: {
      },
      postcss: {
      }
    }
  },
  devServer: {
    open: true,
    host: '127.0.0.1',
    port: 3000,
    https: false,
    hotOnly: false,
    proxy: null,
    before: app => {}
  },
  parallel: require('os').cpus().length > 1,
  pwa: {},
  pluginOptions: {}
};
