const string = require('../../../../util/string')
const origins = require('../deprecated/origins')
const status = require('../deprecated/status')
const batching = require('../deprecated/batching')

// REF: http://bakingstories.blogspot.com/p/12-steps.html
// REF: https://bread-magazine.com/bread-making-steps/

codes = {
  prep: 'prep',
  mix: 'mix',
  ferment: 'ferment', // bulk or primary ferment
  ferment: 'ferment',
  layer: 'layer',
  preshape: 'preshape',
  shape: 'shape', // or pan/panning
  freeze: 'freeze',
  proof: 'proof', // final proof - second rising
  prebake: 'prebake',
  bake: 'bake',
  assemble: 'assemble',
  decorate: 'decorate'
}

/* PRODUCTION STAGES

Doughs may be fermented or non-fermented.

FERMENTED DOUGH-BASED PRODUCTION STAGES
  - prep
  - mix
  - bulk/primary ferment
  - long ferment [croissants, ...]
  - degas
  - layer [croissants, ...]
  - preshape (rough divisions)
  - rest (bench)
  - shape
  - proof
  - prebake [wash / score / dust / toppings]
  - bake
  - cool
  - present

Some doughs (e.g. croissants at TBS) divide/hold some of the ferment to go back into mix.

*/

function instantiate(code, sequence) {
  // baked (finished) products are allowed to have have unspecified ingredients
  // but all other actions with recipe require ingredients
  const requiresRecipe = code !== codes.prep
  const requiresIngredients = requiresRecipe && code !== codes.bake
  const isInputCounted = code === codes.bake
  const isCounted = code === codes.shape || code === codes.bake
  let batchTypes = batching.all
  let defaultBatchSizing = batching.variable
  switch(code) {
    case codes.bake:
      defaultBatchSizing = batching.none
    case codes.shape:
      batchTypes = [batching.FIXED]
      defaultBatchSizing = batching.fixed
    case codes.prep:
      batchTypes = []
      defaultBatchSizing = batching.none
  }
  return {
    code: code,
    label: string.capitalise(code),
    sequence: sequence,
    hasItemPrepare: code === codes.shape,
    hasItemsPerBatch: code === codes.shape,
    isCounted: isCounted,
    isPrepared: !isCounted,
    isInputCounted: isInputCounted,
    isInputPrepared: !isInputCounted,
    inputs: null, // lazy init below
    outputs: null, // lazy init below,
    batchTypes: batchTypes,
    defaultOrigin: code === codes.prep ? origins.code.supplied : origins.produced,
    defaultStatus: code === codes.bake ? status.finished : status.ingredient,
    defaultBatchSizing: defaultBatchSizing,
    allowPartialFixedBatch: code !== codes.prep, // preping has no batches
    requiresRecipe: requiresRecipe,
    requiresIngredients: requiresIngredients,
    isPrepare: code === codes.prep,
    isMix: code === codes.mix,
    isFerment: code === codes.ferment,
    isLayer: code === codes.layer,
    isShape: code === codes.shape,
    isBake: code === codes.bake,
    isAssemble: code === codes.assemble,
    isDecorate: code === codes.decorate
  }
}

const enums = {
  prep: instantiate(codes.prep, 1),
  mix: instantiate(codes.mix, 2),
  ferment: instantiate(codes.ferment, 3),
  layer: instantiate(codes.layer, 4),
  shape: instantiate(codes.shape, 5),
  bake: instantiate(codes.bake, 6),
  assemble: instantiate(codes.assemble, 7),
  decorate: instantiate(codes.decorate, 8)
}

function getInputStages(code) {
  switch(code) {
    case codes.prep:
      return []
    case codes.mix:
      return [enums.prep, enums.mix]
    case codes.ferment:
      return [enums.layer] // why not mix ?
    case codes.layer:
      return [enums.prep, enums.mix]
    case codes.shape:
      return [enums.mix, enums.layer]
    case codes.bake:
      return [enums.prep, enums.shape]
    case codes.assemble:
      return [enums.prep, enums.mix, enums.shape, enums.bake]
    case codes.decorate:
      return [enums.prep, enums.mix, enums.shape, enums.bake, enums.assemble]
    default:
      throw new Error(`invalid stage code ${code}`)
  }
}

function getOutputStages(code) {
  switch(code) {
    case codes.prep:
      return [enums.mix, enums.ferment, enums.layer, enums.shape, enums.bake]
    case codes.mix:
      return [enums.ferment, enums.layer, enums.shape, enums.bake]
    case codes.ferment:
      return [enums.mix, enums.layer, enums.shape, enums.bake]
    case codes.layer:
      return [enums.mix, enums.ferment, enums.shape, enums.bake]
    case codes.shape:
      return [mix, ferment, layer, bake]
    case codes.bake:
      return [assemble, decorate]
    case codes.assemble:
      return [decorate]
    case codes.decorate:
      return []
    default:
      throw new Error(`invalid stage code: '${code}'`)
  }
}

const all = Object.values(enums)
all.forEach(x => {
  x.inputs = getInputStages(x.code)
  x.outputs = getOutputStages(x.code)
})

export default {
  codes,
  enums,
  all
}


