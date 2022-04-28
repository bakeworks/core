const BATCH_MODES = {
  none: { code: 'none', label: 'None', min: false, max: false, step: false, fixed: false, partial: false, },
  fixed: { code: 'fixed', label: 'Fixed', in: false, max: false, step: false, fixed: true, partial: true, },
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

module.exports = {
  BATCH_MODES,
  ALL_BATCH_MODES,
  STAGES
}
