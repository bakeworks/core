import random from './random.js'

// Returns a 16 character 'unique' id.
function newUUID() {
  return random.uuid(16)
}

export default  {
  newUUID
}
