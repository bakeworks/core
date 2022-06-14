const BATCH_MODES = {
  none: { code: 'none', label: 'None', min: false, max: false, step: false, fixed: false, partial: false, },
  fixed: { code: 'fixed', label: 'Fixed', min: false, max: false, step: false, fixed: true, partial: true, },
  variable: { code: 'variable', label: 'Variable', min: true, max: true, step: false, fixed: false, partial: false, },
  stepped: { code: 'stepped', label: 'Stepped', min: true, max: true, step: true, fixed: false, partial: false, },
}

const ALL_BATCH_MODES = Object.values(BATCH_MODES)

const STAGES = {
  base: { code: 'base', label: 'Base', batchModes: [] },
  mix: { code: 'mix', label: 'Mix', batchModes: ALL_BATCH_MODES },
  // ferment: { code: 'ferment', label: 'Ferment', batchModes: ALL_BATCH_MODES },
  layer: { code: 'layer', label: 'Layer', batchModes: ALL_BATCH_MODES },
  shape: { code: 'shape', label: 'Shape', batchModes: [BATCH_MODES.fixed] },
  fill: { code: 'fill', label: 'Fill', batchModes: [] },
  bake: { code: 'bake', label: 'Bake', batchModes: [] },
  top: { code: 'top', label: 'Top', batchModes: [] },
  slice: { code: 'slice', label: 'Slice', batchModes: [] },
  package: { code: 'package', label: 'Package', batchModes: [] },
}

const STAGE_INPUTS = {
  base: [],
  mix: ['base', 'mix'],
  layer: ['base', 'mix'],
  shape: ['layer', 'mix'],
  fill: ['shape', 'mix', 'base'],
  bake: ['shape'],
  top: ['bake', 'mix', 'base'],
}

const MIX_TYPES = {
  dough: {
    code: 'dough',
    label: 'Dough',
    optionalStages: [STAGES.layer, STAGES.proof]
  },
  starter: {
    code: 'starter',
    label: 'Starter',
    optionalStages: []
  },
  batter: {
    code: 'batter',
    label: 'Batter',
    optionalStages: []
  },
}

function mixTypeHasOptionalStage(mixType, stageCode) {
  return mixType.optionalStages.find(stage => stage.code === stageCode)
}

const DAYS = {
  sun: { dow: 0, label: 'Sun' },
  mon: { dow: 1, label: 'Mon' },
  tue: { dow: 2, label: 'Tue' },
  wed: { dow: 3, label: 'Wed' },
  thu: { dow: 4, label: 'Thu' },
  fri: { dow: 5, label: 'Fri' },
  sat: { dow: 6, label: 'Sat' },
}

const DAY_KEYS = Object.keys(DAYS)

const DOWS = {} // keyed by integer dows
Object.keys(DAYS).forEach(key => DOWS[DAYS[key].dow] = DAYS[key])

const PRIORITIES = [1,2,3,4,5,6,7,8,9]

const PRIORITY_LABELS = {
  "1": 'Highest',
  "2": 'Very High',
  "3": 'High',
  "4": 'Medium High',
  "5": 'Medium',
  "6": 'Medium Low',
  "7": 'Low',
  "8": 'Very Low',
  "9": 'Lowest',
}

const PERCENT_MEASURES = {
  bakers: { code: 'bakers', label: 'Bakers' },
  actual: { code: 'actual', label: 'Actual' },
}

function validateMeasures(measure, values) {
  if (values.length === 0) {
    return { ok: false, message: 'At least one measure value of 100% required.'}
  }
  const code = typeof measure === 'object' ? measure.code : measure
  if (code === PERCENT_MEASURES.bakers.code) {
    const message = `${PERCENT_MEASURES[code].label} measure requires one or more values equal to 100%.`
    const ok = values.find(v => v === 100)
    return { ok, message }
  }
  if (code === PERCENT_MEASURES.actual.code) {
    const message = `${PERCENT_MEASURES[code].label} measure requires values to total 100%.`
    const total = values.reduce((memo, val) => memo + val, 0)
    return { ok: total === 100, message }
  }
  return { ok: false, message: `Invalid measure code '${code}'` }
}

module.exports = {
  MIX_TYPES,
  BATCH_MODES,
  ALL_BATCH_MODES,
  STAGES,
  STAGE_INPUTS,
  DAYS,
  DAY_KEYS,
  DOWS,
  PRIORITIES,
  PRIORITY_LABELS,
  PERCENT_MEASURES,
  validateMeasures,
  mixTypeHasOptionalStage
}
