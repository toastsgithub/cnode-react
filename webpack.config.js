const path = require('path')
const webpack = require('webpack')
const theme = require('./antd-theme.js')
const lessToJs = require('less-vars-to-js');
const fs = require('fs')
const themeVariables = lessToJs(fs.readFileSync(path.join(__dirname, './theme.less'), 'utf8'));
console.log(themeVariables)
module.exports = {
  entry: [
    // 'webpack-dev-server/client',
    path.resolve(__dirname, 'src/index.js')
  ],
  output: {
    path: path.resolve(__dirname, 'public/dist'), //打包后的文件存放的地方
    filename: 'bundle.js', //打包后输出文件的文件名
    // publicPath: 'http://localhost:8888/build/'  //启动本地服务后的根目录
  },
  module: {
    loaders: [{
        test: /\.jsx?$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
          cacheDirectory: true,
          plugins: [
            ['import', { libraryName: 'antd', style: true }],
          ]
        }
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.less$/, use:[
        {loader: "style-loader"},
        {loader: "css-loader"},
        {loader: "less-loader", 
          options: {
            modifyVars: themeVariables
          }
        }
      ]},
      { test: /\.styl$/, loader: "style-loader!css-loader!stylus-loader" },
      { test: /\.(png|jpg|gif)$/, loader: 'url?limit=819200' },
      { test: /\.svg$/, loader: 'svg-loader?pngScale=2' }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    publicPath: '/',
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
}
