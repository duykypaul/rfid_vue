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
  }
}
