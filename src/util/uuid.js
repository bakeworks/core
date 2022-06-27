const random = require('bakeworks-core/src/util/random')

// Returns a 16 character 'unique' id.
export function newUUID() {
  return random.uuid(16)
}
