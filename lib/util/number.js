module.exports = {
  isMultiple: (numerator, denominator) => {
    return denominator !== 0 && (numerator % denominator) === 0
  }
}