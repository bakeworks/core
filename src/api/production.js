const BATCH_MODES = {
  none: {
    code: 'none', label: 'None',
    min: false, max: false, step: false, fixed: false, partial: false,
  },
  fixed: {
    code: 'fixed', label: 'Fixed',
    min: false, max: false, step: false, fixed: true, partial: true,
  },
  variable: {
    code: 'variable', label: 'Variable',
    min: true, max: true, step: false, fixed: false, partial: false,
  },
  stepped: {
    code: 'stepped', label: 'Stepped',
    min: true, max: true, step: true, fixed: false, partial: false,
  },
}

const ALL_BATCH_MODES = Object.values(BATCH_MODES)

const BATCH_MEASURES = {
  na: { code: 'n/a', label: 'N/A' },
  kgs: { code: 'kgs', label: 'Kgs' },
  units: { code: 'units', label: 'Units' },
}

const RECIPE_TYPES = {
  ingredient: {
    code: 'ingredient', label: 'Ingredient',
    batchMeasure: BATCH_MEASURES.kgs.code,
    batchModes: [],
    inputTypes: []
  },
  mix: {
    code: 'mix', label: 'Mix',
    batchMeasure: BATCH_MEASURES.kgs.code,
    batchModes: ALL_BATCH_MODES,
    inputTypes: ['ingredient', 'mix']
    },
  ferment: {
    code: 'ferment', label: 'Ferment',
    batchMeasure: BATCH_MEASURES.kgs.code,
    batchModes: ALL_BATCH_MODES,
    inputTypes: ['mix']
    },
  layer: {
    code: 'layer', label: 'Layer',
    batchMeasure: BATCH_MEASURES.kgs.code,
    batchModes: ALL_BATCH_MODES,
    inputTypes: ['ingredient', 'mix']
    },
  shape: {
    code: 'shape', label: 'Shape',
    batchMeasure: BATCH_MEASURES.na.code,
    batchModes: [BATCH_MODES.fixed],
    inputTypes: ['layer', 'mix']
    },
  fill: {
    code: 'fill', label: 'Fill',
    batchMeasure: BATCH_MEASURES.units.code,
    batchModes: ALL_BATCH_MODES,
    inputTypes: ['shape', 'mix', 'ingredient']
    },
  bake: {
    code: 'bake', label: 'Bake',
    batchMeasure: BATCH_MEASURES.units.code,
    batchModes: [],
    inputTypes: ['shape']
    },
  top: {
    code: 'top', label: 'Top',
    batchMeasure: BATCH_MEASURES.units.code,
    batchModes: [],
    inputTypes: ['bake', 'mix', 'ingredient']
    },
  slice: {
    code: 'slice', label: 'Slice',
    batchMeasure: BATCH_MEASURES.units.code,
    batchModes: [],
    inputTypes: ['bake']
    },
  package: {
    code: 'package', label: 'Package',
    batchMeasure: BATCH_MEASURES.units.code,
    batchModes: [],
    inputTypes: ['bake', 'slice']
  },
}

const MIX_TYPES = {
  dough: {
    code: 'dough',
    label: 'Dough',
  },
  starter: {
    code: 'starter',
    label: 'Starter',
  },
  batter: {
    code: 'batter',
    label: 'Batter',
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
  RECIPE_TYPES,
  DAYS,
  DAY_KEYS,
  DOWS,
  PRIORITIES,
  PRIORITY_LABELS,
  PERCENT_MEASURES,
  validateMeasures,
  mixTypeHasOptionalStage
}
