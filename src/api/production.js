const BATCH_MODES = {
  none: { code: 'none', label: 'None', min: false, max: false, step: false, fixed: false, partial: false, },
  fixed: { code: 'fixed', label: 'Fixed', min: false, max: false, step: false, fixed: true, partial: true, },
  variable: { code: 'variable', label: 'Variable', min: true, max: true, step: false, fixed: false, partial: false, },
  stepped: { code: 'stepped', label: 'Stepped', min: true, max: true, step: true, fixed: false, partial: false, },
}

const ALL_BATCH_MODES = Object.values(BATCH_MODES)

const STAGES = {
  mix: { code: 'mix', label: 'Mix', batchModes: ALL_BATCH_MODES },
  ferment: { code: 'ferment', label: 'Ferment', batchModes: ALL_BATCH_MODES },
  layer: { code: 'layer', label: 'Layer', batchModes: ALL_BATCH_MODES },
  shape: { code: 'shape', label: 'Shape', batchModes: [BATCH_MODES.fixed] },
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

const PRIORITIES = [1,2,3,4,5,6,7,8,9]

module.exports = {
  BATCH_MODES,
  ALL_BATCH_MODES,
  STAGES,
  DAYS,
  DAY_KEYS,
  PRIORITIES
}
