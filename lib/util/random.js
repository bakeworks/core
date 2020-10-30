const number = require('./number')

function randomInt(max = Number.MAX_SAFE_INTEGER) {
  return Math.round(Math.random() * max)  
}

function randomIntBetween(min, max) {
  if (min > max) return randomIntBetween(max, min)
  return min + Math.round(Math.random() * (max - min))  
}

function randomElement(array) {
  return array[randomInt(array.length)]
}

function randomProperty(obj) {
  const keys = Object.keys(obj)
  return obj[randomElement(keys)]
}

// Argument may be array or string (or indexable object).
// Returns a new array or string which is shuffled version of argument.
function shuffle(arg) {
  const n = arg.length
  const n1 = n - 1
  const result = []
  while (result.length < n) {
    const i = randomInt(n1)
    if (result.find(j => i === j) === undefined) {
      result.push(i)
    }
  }
  for (let i = 0; i < result.length; i++) {
    result[i] = arg[result[i]]
  }
  return (typeof arg === 'string') ? result.join('') : result
}

function uuid(length = 16) {
  var uuid = ''
  const h = number.HEX_DIGITS.length - 1
  for (let i = 0; i < length; i++) {
    uuid += number.HEX_DIGITS[randomInt(h)]
  }
  return uuid
}

module.exports = {
  randomInt,
  randomIntBetween,
  uuid,
  randomElement,
  randomProperty,
  shuffle
}