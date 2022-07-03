import numberUtil from '../../../util/number'

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
    code: 'ingredient', label: 'Ingredient', plural: 'Ingredients',
    batchMeasure: BATCH_MEASURES.kgs.code,
    batchModes: [],
    inputCount: { min: 0, max: 0 },
    inputTypes: [],
  },
  mix: {
    code: 'mix', label: 'Mix', plural: 'Mixes',
    batchMeasure: BATCH_MEASURES.kgs.code,
    batchModes: ALL_BATCH_MODES,
    inputCount: { min: 2, max: 99 },
    inputTypes: ['ingredient', 'mix'],
    },
  ferment: {
    code: 'ferment', label: 'Ferment', plural: 'Ferments',
    batchMeasure: BATCH_MEASURES.kgs.code,
    batchModes: ALL_BATCH_MODES,
    inputCount: { min: 1, max: 1 },
    inputTypes: ['mix']
    },
  layer: {
    code: 'layer', label: 'Layer', plural: 'Layers',
    batchMeasure: BATCH_MEASURES.kgs.code,
    batchModes: ALL_BATCH_MODES,
    inputCount: { min: 1, max: 99  },
    inputTypes: ['ingredient', 'mix']
    },
  shape: {
    code: 'shape', label: 'Shape', plural: 'Shapes',
    batchMeasure: BATCH_MEASURES.na.code,
    batchModes: [BATCH_MODES.fixed],
    inputCount: { min: 1, max: 99  },
    inputTypes: ['layer', 'mix']
    },
  fill: {
    code: 'fill', label: 'Fill', plural: 'Fills',
    batchMeasure: BATCH_MEASURES.units.code,
    batchModes: ALL_BATCH_MODES,
    inputCount: { min: 1, max: 99  },
    inputTypes: ['shape', 'mix', 'ingredient']
    },
  bake: {
    code: 'bake', label: 'Bake', plural: 'Bakes',
    batchMeasure: BATCH_MEASURES.units.code,
    batchModes: [],
    inputCount: { min: 1, max: 1 },
    inputTypes: ['shape']
    },
  top: {
    code: 'top', label: 'Top', plural: 'Tops',
    batchMeasure: BATCH_MEASURES.units.code,
    batchModes: [],
    inputCount: { min: 2, max: 99 },
    inputTypes: ['bake', 'mix', 'ingredient']
    },
  slice: {
    code: 'slice', label: 'Slice', plural: 'Slices',
    batchMeasure: BATCH_MEASURES.units.code,
    batchModes: [],
    inputCount: { min: 1, max: 1 },
    inputTypes: ['bake']
    },
  package: {
    code: 'package', label: 'Package', plural: 'Packages',
    batchMeasure: BATCH_MEASURES.units.code,
    batchModes: [],
    inputCount: { min: 1, max: 1 },
    inputTypes: ['bake', 'slice']
  },
}

const MIX_TYPES = {
  dough: {
    code: 'dough',
    label: 'Dough',
    plural: 'Doughs',
  },
  starter: {
    code: 'starter',
    label: 'Starter',
    plural: 'Starters',
  },
  batter: {
    code: 'batter',
    label: 'Batter',
    plural: 'Batters',
  },
}

function mixTypeHasOptionalStage(mixType, stageCode) {
  return mixType.optionalStages.find(stage => stage.code === stageCode)
}

const DAYS = {
  sun: { dow: 0, label: 'Sun', longLabel: 'Sunday' },
  mon: { dow: 1, label: 'Mon', longLabel: 'Monday' },
  tue: { dow: 2, label: 'Tue', longLabel: 'Tuesday' },
  wed: { dow: 3, label: 'Wed', longLabel: 'Wednesday' },
  thu: { dow: 4, label: 'Thu', longLabel: 'Thursday' },
  fri: { dow: 5, label: 'Fri', longLabel: 'Friday' },
  sat: { dow: 6, label: 'Sat', longLabel: 'Saturday' },
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
    const total = numberUtil.round(values.reduce((memo, val) => memo + val, 0), 3)
    if (total === 100) return { ok: true, message }
    return { ok: false, message: `${message} Currently ${total.toString()}` }
  }
  return { ok: false, message: `Invalid measure code '${code}'` }
}

export default  {
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
