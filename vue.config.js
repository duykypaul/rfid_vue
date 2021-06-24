'use strict'
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = 'Rfid' // page title

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  chainWebpack: config => {
    const cssRule = config.module.rule('css')
    cssRule.uses.clear()

    cssRule
      .use('sass-loader')
      .loader('sass-loader')
      .loader('css-loader')
      .loader('style-loader')
      .tap(options => {
        return options
      })
  },
  css: {
    loaderOptions: {
      scss: {
        // additionalData: `@import "@/assets/scss/_variables.scss";`
        additionalData: `@import "@/theme/theme.scss";`
      }
    }
  },
  devServer: {
    // This will forward any request that does not match a static file to localhost:3000
    // proxy: 'http://localhost:1102'
    proxy: process.env.VUE_APP_API_BASE_URL
  }
}
