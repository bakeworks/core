/*
Product origins:
  * produced
  * supplied

Origin properties
{
  code,
  label,
  isProduced,
  isSupplied
}
*/

const PRODUCED_CODE = 'P'
const SUPPLIED_CODE = 'S'

function instantiate(code, label) {
  return {
    code: code,
    label: label,
    isProduced: code === PRODUCED_CODE,
    isSupplied: code === SUPPLIED_CODE
  }
}

const PRODUCED = instantiate(PRODUCED_CODE, 'Produced')
const SUPPLIED = instantiate(SUPPLIED_CODE, 'Supplied')
const ALL = [SUPPLIED, PRODUCED]
const DEFAULT = PRODUCED
