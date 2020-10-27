const string = require('../../util').string
const origins = require('./origins')
const status = require('./status')
const batching = require('./batching')

/*
Stages of production:
  * prep (was raw/weigh)
  * mix
  * ferment
  * layer
  * shape
  * bake
  * assemble
  * decorate

  Stage properties
{
  code:,
  label:,
  sequence:
}

Ref:
http://bakingstories.blogspot.com/p/12-steps.html

*/

const WEIGH_CODE = 'weigh' // or scale
const MIX_CODE = 'mix'
const FERMENT_CODE = 'ferment' // bulk/primary fermentation
const LAYER_CODE = 'layer' // or fold
// const PRESHAPE_CODE = 'preshape' // or rounding - before rest
// const REST_CODE = 'rest' // before final shape
const SHAPE_CODE = 'shape' // or panning
// const PROOF_CODE = 'proof' // or final ferment
const BAKE_CODE = 'bake'
const ASSEMBLE_CODE = 'assemble'
const DECORATE_CODE = 'decorate'

function instantiate(code, sequence) {
  const requiresRecipe = code !== WEIGH_CODE
  /* baked (finished) products are allowede to have have unspecified ingredients
   * but all other actions with recipe require ingredients */
  const requiresIngredients = requiresRecipe && code !== BAKE_CODE
  const isInputCounted = code === BAKE_CODE
  const isCounted = code === SHAPE_CODE || code === BAKE_CODE
  let batchTypes = batching.ALL
  let defaultBatchSizing = batching.VARIABLE
  switch(code) {
    case BAKE_CODE:
      defaultBatchSizing = batching.NONE
    case SHAPE_CODE:
      batchTypes = [batching.FIXED]
      defaultBatchSizing = batching.FIXED
    case WEIGH_CODE:  
      batchTypes = []
      defaultBatchSizing = batching.NONE
  }
  return {
    code: code,
    label: string.capitalize(code),
    sequence: sequence,
    hasItemWeight: code === SHAPE_CODE,
    hasItemsPerBatch: code === SHAPE_CODE,
    isCounted: isCounted,
    isWeight: !isCounted,
    isInputCounted: isInputCounted,
    isInputWeighed: !isInputCounted,
    inputs: null, // lazy init below
    outputs: null, // lazy init below,
    batchTypes: batchTypes,
    defaultOrigin: code === WEIGH_CODE ? origins.SUPPLIED : origins.PRODUCED,
    defaultStatus: code === BAKE_CODE ? status.FINISHED : status.INGREDIENT,
    defaultBatchSizing: defaultBatchSizing,
    allowPartialFixedBatch: code !== WEIGH_CODE, // weighing has no batches
    requiresRecipe: requiresRecipe,
    requiresIngredients: requiresIngredients
  }
}

const WEIGH = instantiate(WEIGH_CODE, 1)
const MIX = instantiate(MIX_CODE, 2)
const FERMENT = instantiate(FERMENT_CODE, 3)
const LAYER = instantiate(LAYER_CODE, 4)
const SHAPE = instantiate(SHAPE_CODE, 5)
const BAKE = instantiate(BAKE_CODE, 6)
const ASSEMBLE = instantiate(ASSEMBLE_CODE, 7)
const DECORATE = instantiate(DECORATE_CODE, 8)
const ALL = [WEIGH, MIX, FERMENT, LAYER, SHAPE, BAKE] // ASSEMBLE DECORATE
// const PREBAKE = [WEIGH, MIX, FERMENT, LAYER, SHAPE]
const DEFAULT = BAKE

function inputStages(stage) {
  if (stage.inputs === null) {
    switch(stage.code) {
      case WEIGH_CODE:
        stage.inputs = []
      case MIX_CODE:
        stage.inputs = [WEIGH, MIX]
      case FERMENT_CODE:
        stage.inputs = [LAYER] // why not MIX ?
      case LAYER:
        stage.inputs = [WEIGH, MIX]
      case SHAPE:
        stage.inputs = [MIX, LAYER]
      case BAKE:
        stage.inputs = [WEIGH, SHAPE]
      case ASSEMBLE:
        stage.inputs = [WEIGH, MIX, SHAPE, BAKE]
      case DECORATE:
        stage.inputs = [WEIGH, MIX, SHAPE, BAKE, ASSEMBLE]
    }
  }
  return stage.inputs
}

function outputStages(stage) {
  if (stage.outputs === null) {
    switch(stage.code) {
      case WEIGH_CODE:
        stage.outputs = [MIX, FERMENT, LAYER, SHAPE, BAKE]
      case MIX_CODE:
        stage.outputs = [FERMENT, LAYER, SHAPE, BAKE]
      case FERMENT_CODE:
        stage.outputs = [MIX, LAYER, SHAPE, BAKE] 
      case LAYER:
        stage.outputs = [MIX, FERMENT, SHAPE, BAKE]
      case SHAPE:
        stage.outputs = [MIX, FERMENT, LAYER, BAKE]
      case BAKE:
        stage.outputs = [ASSEMBLE, DECORATE]
      case ASSEMBLE:
        stage.inputs = [DECORATE]
      case DECORATE:
        stage.inputs = []
      }
  }
  return stage.outputs
}

module.exports = {
  WEIGH,
  MIX,
  FERMENT,
  LAYER,
  SHAPE,
  BAKE,
  ASSEMBLE,
  DECORATE,
  ALL,
  DEFAULT,
  inputStages,
  outputStages
}


