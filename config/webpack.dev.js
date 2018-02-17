const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const path = require('path')
const PORT = process.env.port || 3000

module.exports = merge(common, {
  devServer: {
    contentBase: path.resolve(__dirname, '../public'),
    port: PORT,
    proxy: {
      "/api": {
        "target": {
          "host": "cnodejs.org",
          "protocol": 'https',
          "port": 80
        },
        pathRewrite: { '^/api': '/api/v1' },
        // ignorePath: true,
        changeOrigin: true,
        secure: false
      }
    },
    port: 8080,
    historyApiFallback: true
  }
})