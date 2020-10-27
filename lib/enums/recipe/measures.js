/*
Product (recipe) measures:
  * bakers
  * actual (percentage)

Origin properties
{
  code,
  label,
  isBakers,
  isActual
}
*/

const BAKERS_CODE = 'B'
const ACTUAL_CODE = 'A'

function instantiate(code, label) {
  return {
    code: code,
    label: label,
    isBakers: code === BAKERS_CODE,
    isActual: code === ACTUAL_CODE,
  }
}

const BAKERS = instantiate(BAKERS_CODE, 'Bakers')
const ACTUAL = instantiate(ACTUAL_CODE, 'Actual')
const ALL = [BAKERS, ACTUAL]
const DEFAULT = BAKERS

module.exports = {
  BAKERS, ACTUAL, ALL, DEFAULT
}