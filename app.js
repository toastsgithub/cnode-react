/**
 * Simple front-end server
 */

const express = require('express')
const path = require('path')
const compression = require('compression')
const proxy = require('http-proxy-middleware')
const favicon = require('serve-favicon')
const PORT = 9000

const app = new express()
app.use(compression())

app.use('/static', express.static('public/static'))
app.use(express.static('public'))
app.use('/api', proxy({
    target: 'https://cnodejs.org',
    pathRewrite: {'^/api': '/api/v1'},
    changeOrigin: true }))
//app.use('/api', proxy({target: 'https://cnodejs.org', changeOrigin: true}))
app.get('/*', (req, res)=>{
    const idxPath = path.resolve(__dirname, 'public/index.html')
    res.sendFile(idxPath)
})

app.listen(PORT, ()=>{
    console.log('app listening on port: '+PORT)
})