const number = require('../../util/number')

/*
Production batch sizing:
  * none
    * fix = min = max = step = 0
  * fixed
    * fix > 0, min = max = step = 0
  * variable
    * fix = 0, min > 0, max > min, step = 0
  * stepped
    * fix = 0, min > 0, max > min, step > 0
    * min and max are multiples of step
*/

const enums = {
  // fix means min === max
  none: {
    code: 'none', label: 'None',
    fix: false, min: false, max: false, step: false, partial: false
  },
  fixed: {
    code: 'fixed', label: 'Fixed',
    fix: true, min: true, max: true, step: false, partial: true
  },
  variable: {
    code: 'variable', label: 'Variable',
    fix: false, min: true, max: true, step: false, partial: false
  },
  stepped: {
    code: 'stepped', label: 'Stepped',
    fix: false, min: true, max: true, step: true, partial: false
  },
}

// Returns an string with error messages separated by "\n" if params don't suit type (type).
// Returns null if no error.
function validate(code, min, max, step, partial = false) {
  const e = enums[code]
  if (e === undefined)
    return `invalid batching code: ${code}`
  const errors = []
  if (code === codes.none) {
    if (min > 0 || max > 0 || step > 0)
      errors.push(`${e.label} batch min, max and step must be zero.`)
  } else if (code === codes.fixed) {
    if (min <= 0)
      errors.push(`${e.label} batch size must be greater than zero.`)
    if (step > 0)
      errors.push(`${e.label} batch step must be zero.`)
  } else if (code === codes.variable || code === codes.stepped) {
    if (min >= max)
      errors.push(`${e.label} batch minimum must be less than the maximum.`)
    if (code === codes.stepped) {
      if (!number.isMultiple(step, min))
        errors.push(`${e.label} batch minimum must be a multiple of the batch step size.`)
      if (!number.isMultiple(step, max))
        errors.push(`${e.label} batch maximum must be a multiple of the batch step size.`)
    }
  }
  if (code !== codes.fixed && partial)
    errors.push(`Only ${enums.fixed.label} batches may be partial.`)
  if (errors.length === 0)
    return null
  return errors.length === 1 ? errors[0] : errors.join('\n')
}

/* DEPRECATED
function normalise(type, min, max, step, partial) {
  const error = validate(type, min, max, step, partial)
  if (error) throw new Error(error)
  switch(type) {
    case NONE_CODE:
      return none()
    case FIXED_CODE:
      return fixed(min, partial)
    case VARIABLE_CODE:
      return variable(min, max)
    case STEPPED_CODE:
      return stepped(min, step, max)
    default:
      throw new Error(`unhandled batch size type ${type}'`)
  }
}
*/

module.exports = {
  ...enums,
  validate
}
