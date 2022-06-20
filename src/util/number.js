const HEX_DIGITS = '0123456789ABCDEF'

function isMultiple(numerator, denominator) {
  return denominator !== 0 && (numerator % denominator) === 0
}

function round(number, places) {
  Number.parseFloat(number.toFixed(places))
}

module.exports = {
  HEX_DIGITS,
  isMultiple,
  round
}
