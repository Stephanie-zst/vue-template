const path = require('path')
const pkg = require('./package.json')
const CompressionPlugin = require("compression-webpack-plugin") // 开启gzip
const ProgressBarPlugin = require('progress-bar-webpack-plugin') // 构建进度插件
const isProd = process.env.NODE_ENV === 'production'
const publicPathList = {
  development: './',
  production: 'https://',
}
process.env.VUE_APP_VERSION = pkg.version

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  lintOnSave: false,
  publicPath: publicPathList[process.env.NODE_ENV],
  productionSourceMap: false,

  devServer: {
    // 代理
    proxy: {
      '/api': {
        target: isProd
          ? 'https://'
          : 'http://',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },

  configureWebpack: config => {
    const plugins = [
      new ProgressBarPlugin()
    ]

    if (isProd) {
      config.optimization = {
        minimizer: [
          // new TerserPlugin({
          //   terserOptions: {
          //     ecma: undefined,
          //     warnings: false,
          //     parse: {},
          //     compress: {
          //       drop_console: true,
          //       drop_debugger: false,
          //       pure_funcs: ['console.log']
          //     }
          //   }
          // })
        ]
      }

      plugins.push(
        new CompressionPlugin({ // gzip压缩
          test: /\.js$|\.html$|\.css$|\.jpg$|\.jpeg$|\.png/, // 需要压缩的文件类型
          threshold: 1024,
          deleteOriginalAssets: false // 是否删除原文件
        })
      )
    }

    return {
      plugins
    }
  },

  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
    config.plugin('html')
      .tap(args => {
        args[0].title = '标题'
        return args
      })
  }
}