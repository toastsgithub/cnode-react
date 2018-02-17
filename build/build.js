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
    if (exists) {
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
    return new Primise((resolve, reject)=>{
      rm('./dist', (err)=>{
        if (err) throw err
        resolve()
      })
    })
  }
}).then(()=>{
  // run build process
  console.log('build done')
})