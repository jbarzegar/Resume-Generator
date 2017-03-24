
// If no --build flag is passed run the watch
if (process.argv.indexOf('--build') === -1) {
  require('./scripts/watcher')
} else {
  require('./scripts/compile-css')(true)
  require('./scripts/resume-gen')(true)
}
