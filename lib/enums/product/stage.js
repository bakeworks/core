const string = require('../../util/string')
const origin = require('origin')
const status = require('status')
const batchSizing = require('batch_sizing')

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
  let batchTypes = batchSizing.ALL
  let defaultBatchSizing = batchSizing.VARIABLE
  switch(code) {
    case BAKE_CODE:
      defaultBatchSizing = batchSizing.NONE
    case SHAPE_CODE:
      batchTypes = [batchSizing.FIXED]
      defaultBatchSizing = batchSizing.FIXED
    case WEIGH_CODE:  
      batchTypes = []
      defaultBatchSizing = batchSizing.NONE
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
    defaultOrigin: code === WEIGH_CODE ? origin.SUPPLIED : origin.PRODUCED,
    defaultStatus: code === BAKE_CODE ? status.FINISHED : status.INGREDIENT,
    defaultBatchSizing: defaultBatchSizing,
    allowPartialFixedBatch: code !== WEIGH_CODE, // weighing has no batches
    requiresRecipe: requiresRecipe,
    requiresIngredients: requiresIngredients
  }
}

export const WEIGH = instantitate(WEIGH_CODE, 1)
export const MIX = instantitate(MIX_CODE, 2)
export const FERMENT = instantitate(FERMENT_CODE, 3)
export const LAYER = instantitate(LAYER_CODE, 4)
export const SHAPE = instantitate(SHAPE_CODE, 5)
export const BAKE = instantitate(BAKE_CODE, 6)
export const ASSEMBLE = instantitate(ASSEMBLE_CODE, 7)
export const DECORATE = instantitate(DECORATE_CODE, 8)
export const ALL = [WEIGH, MIX, FERMENT, LAYER, SHAPE, BAKE] // ASSEMBLE DECORATE
export const PREBAKE = [WEIGH, MIX, FERMENT, LAYER, SHAPE]
export const DEFAULT = BAKE

export function inputStages(stage) {
  switch(stage.code) {
    case WEIGH_CODE:
      return []
    case MIX_CODE:
      return [PREMIX, MIX]
    case FERMENT_CODE:
      return [LAYER] // why not MIX ?
    case LAYER:
      return [WEIGH, MIX]
    case SHAPE:
      return [MIX, LAYER]
    case BAKE:
      return [WEIGH, SHAPE]
    case ASSEMBLE:
      return [WEIGH, MIX, SHAPE, BAKE]
    case DECORATE:
      return [WEIGH, MIX, SHAPE, BAKE, ASSEMBLE]
  }
}

export function inputStages(stage) {
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

export function outputStages(stage) {
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



