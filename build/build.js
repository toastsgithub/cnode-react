process.env.NODE_ENV = 'production'

const ora = require('ora')
const fs = require('fs')
const fsutil = require('@duanzm/fsutil')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const webpackConfig = require('../config/webpack.prod.js')
const spinner = ora('building for production...')
const distPath = path.resolve(__dirname, '../dist')

spinner.start()

new Promise((resolve, reject)=>{
  // check the dist directory
  fsutil.exist(distPath, (err, exist)=>{
    if (exist) {
      resolve(true)
    } else {
      resolve(false)
    }
  })
}).then((exist)=>{
  if (!exist) {
    // if directory not exist, make it
    return new Promise((resolve, reject)=>{
      fs.mkdir('./dist', 0777, (err)=>{
        if (err) throw err
        resolve()
      })
    })
  } else {
    // dist dir exist, clear it
    return new Promise((resolve, reject)=>{
      rm('./dist/*', (err)=>{
        if (err) throw err
        resolve()
      })
    })
  }
}).then(()=>{
  // run build process
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
  spinner.stop()
})