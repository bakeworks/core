const number = require('../../util/number')

/*
Production batch sizing:
  * none
    * min = max = step = 0
  * fixed
    * min > 0, min = max, step = 0
  * variable
    * min > 0, max > min, step = 0
  * stepped
    * min > 0, max > min, step > 0
    * min and max are multiples of step

BatchSizing properties
{
  type,
  label,
  min,
  max,
  step,
  partial,
  isNone,
  isFixed,
  isVariable,
  isStepped,
  isPartial
}
*/

export const NONE = 'None'
export const FIXED = 'Fixed'
export const VARIABLE = 'Variable'
export const STEPPED = 'Stepped'
export const ALL = [NONE, FIXED, VARIABLE, STEPPED]
export const DEFAULT_MAX = 80 // kgs

function instantiate(type, min, max, step = 0, partial = false) {
  return {
    type: type,
    label: type,
    min: min,
    max: max,
    step: step,
    partial: partial,
    // for convenience
    isNone: type === NONE,
    isFixed: type === FIXED,
    isVariable: type === VARIABLE,
    isStepped: type === STEPPED,
    isPartial: partal
  }
}

export function none() {
  const NONE = instantiate(NONE, 0, 0, 0)
  return NONE
}

export function fixed(batch_size = DEFAULT_MAX, partial = false) {
  return instantiate(FIXED, batch_size, batch_size, 0, partial)
}

export function variable(min = 1, max = DEFAULT_MAX) {
  return instantiate(VARIABLE, TYPE, min, max)
}

export function stepped(step = 4, nsteps = null) {
  return instantiate(STEPPED, step, nsteps === null ? step * 20 : step * nsteps, step)
}

// Returns an string with error messages separated by "\n" if params don't suit type (type).
// Returns null if no error.
export function validate(type, min, max, step, partial = false)
  if (type === FIXED) {
    if (min <= 0) return `${type} batch size must be greater than zero.`
  }
  else if (type === VARIABLE || type === STEPPED) {
    const errors = []
    if (min >= max) errors.push(`${type} batch minimum must be less than the maximum.`)
    if (type === STEPPED) {
      if (!number.isMultiple(step, min)) errors.push(`${type} batch minimum must be a multiple of the batch step size.`)
      if (!number.isMultiple(step, max)) errors.push(`${type} batch maximum must be a multiple of the batch step size.`)
    }
    if (partial) errors.push(`Only ${FIXED} size batches may be partial.`)
    if (errors.length > 0) return errors.join('\n')
  } 
  return null     
end

export function normalize(type, min, max, step, partial) {
  const error = validate(type, min, max, step, partial)
  if (error) throw new Error(error)
  switch(type) {
    case NONE: 
      return none()
    case FIXED:
      return fixed(min, partial)
    case VARIABLE:
      return variable(min, max)
    case STEPPED:
      return stepped(min, step, max)
    default:
      throw new Error(`unhandled batch size type ${type}'`)
  }
}