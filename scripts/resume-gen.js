const fs = require('fs')
const path = require('path')
const { yellow, green } = require('chalk')
const mustache = require('mustache')
const server = require('./dev-server.js')

const getResumeData = () => {
  // Pull the config file
  return new Promise((resolve, reject) => {
    fs.readFile(path.join('.', 'resume.json'), 'utf8', (err, buffer) => {
      if (err) {
        reject(err)
        return
      }
      resolve(buffer)
    })
  })
}

const parseResume = buffer => {
  // Once parsed render it
  const resumeData = JSON.parse(buffer)
  renderNewTemplate(resumeData)
}

const renderNewTemplate = data => {
  fs.readFile(path.join('.', 'templates', 'resume.html'), 'utf8', (err, buffer) => {
    if (err) throw new Error(err)
    const renderedTemplate = mustache.render(buffer, data) // Returns html in a string
    writeSiteTemplate(renderedTemplate)
  })
}

const writeSiteTemplate = template => {
  fs.readdir(path.join('.', 'site'), err => {
    if (err) {
      // If the dir hasn't been create it and continue with the function
      if (err.code === 'ENOENT') {
        fs.mkdirSync(path.join('.', 'site'))
      } else {
        throw new Error(err)
      }
    }
    // Write the html file to dir
    fs.writeFile(path.join('.', 'site', 'index.html'), template, err => {
      if (err) throw new Error(err)
      server.reload()
      return console.log(green('Done'))
    })
  })
}

function init() {
  console.log(yellow('Generating new resume'))
  // Pull config buffer then parse it
  getResumeData()
  .then(resp => parseResume(resp))
  .catch(err => {
    throw new Error(err)
  })
}

module.exports = init
