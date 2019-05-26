const path = require('path')
const resolve = dir => path.join(__dirname, dir)


module.exports = {
  baseUrl: process.env.NODE_ENV === 'production' ? '/' : '/',
  outputDir: 'dist',
  assetsDir: 'static',
  filenameHashing: true,
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
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
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('views', resolve('src/views'))
      .set('routers', resolve('src/routers'))
      .set('styles', resolve('src/style'))
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
