const browsersync = require('browser-sync')
const server = browsersync.create()

function start() {
  server.init({
    server: './site',
    ui: false,
    ghostMode: false
  })
}

function reload() {
  server.reload()
}

module.exports = {
  start,
  reload
}
