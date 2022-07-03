import fs from 'fs'

function dump(path, content) {
  fs.writeFile(path, content, err => {
    if (err) {
      console.log(`Error writing file "${path}" : ${err}`)
    }
  })
}

export default  {
  dump
}
