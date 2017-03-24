const gaze = require('gaze')
const path = require('path')
const { yellow } = require('chalk')

// Tasks
const regenerate = require('./resume-gen')
const compile = require('./compile-css')
const server = require('./dev-server')

console.log('Watcher running...')
server.start()

// Watcher function
gaze([ path.join('.', 'templates', '*.html'), path.join('.', 'resume.json') ], (err, watcher) => {
  if (err) throw new Error(err)
  watcher.on('changed', filepath => {
    console.log(yellow('Rebuiding template...'))
    regenerate()
  })
})

gaze(path.join('.', 'templates', 'styles', '**', '*.css'), (err, watcher) => {
  if (err) throw new Error(err)
  watcher.on('all', filepath => {
    console.log(yellow('Rebuilding styles'))
    compile()
  })
})
