const { green } = require('chalk')
const fs = require('fs')
const path = require('path')
const server = require('./dev-server')

// Post css
const pcss = require('postcss')
const autoprefixer = require('autoprefixer')
const nesting = require('postcss-nested')
const vars = require('postcss-simple-vars')
const nano = require('cssnano')
const rucksack = require('rucksack-css')

const mainFile = path.join('.', 'templates', 'styles', 'main.css')

const readFile = () => {
  fs.readFile(mainFile, 'utf8', (err, buffer) => {
    if (err) throw new Error(err)
    processFile(buffer)
  })
}

const processFile = buffer => {
  const plugins = [ autoprefixer, nesting, vars, rucksack, nano ]
  const styleIn = 'templates/styles/main.css'
  const styleOut = 'site/main.css'
  pcss(plugins)
    .process(buffer, { from: styleIn, to: styleOut })
    .then(result => {
      writeFile(result.css)
    })
}

const writeFile = buffer => {
  fs.writeFile(path.join('.', 'site', 'main.css'), buffer, err => {
    if (err) throw new Error(err)
    console.log(green('Compiled css'))
    server.reload()
  })
}

function init() {
  readFile()
}

module.exports = init
