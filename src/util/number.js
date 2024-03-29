const HEX_DIGITS = '0123456789ABCDEF'

function isMultiple(numerator, denominator) {
  return denominator !== 0 && (numerator % denominator) === 0
}

function round(number, places) {
  return Number.parseFloat(number.toFixed(places))
}

export default  {
  HEX_DIGITS,
  isMultiple,
  round
}
