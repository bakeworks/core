const fs = require('fs')

function dump(path, content) {
  fs.writeFile(path, content)
}

module.exports = {
  dump
}
