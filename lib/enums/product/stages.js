import string from '../../util/string';
import origins from './origins';
import status from './status';
import batching from './batching';

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

Ref:
  * http://bakingstories.blogspot.com/p/12-steps.html
*/

var WEIGH_CODE = 'Weigh'; // or scale
var MIX_CODE = 'Mix';
var FERMENT_CODE = 'Ferment'; // bulk/primary fermentation
var LAYER_CODE = 'Layer'; // or fold
// const PRESHAPE_CODE = 'preshape' // or rounding - before rest
// const REST_CODE = 'rest' // before final shape
var SHAPE_CODE = 'Shape'; // or panning
// const PROOF_CODE = 'proof' // or final ferment
var BAKE_CODE = 'Bake';
var ASSEMBLE_CODE = 'Assemble';
var DECORATE_CODE = 'Decorate';

function instantiate(code, sequence) {
  var requiresRecipe = code !== WEIGH_CODE;
  /* baked (finished) products are allowede to have have unspecified ingredients
   * but all other actions with recipe require ingredients */
  var requiresIngredients = requiresRecipe && code !== BAKE_CODE;
  var isInputCounted = code === BAKE_CODE;
  var isCounted = code === SHAPE_CODE || code === BAKE_CODE;
  var batchTypes = batching.all;
  var defaultBatchSizing = batching.VARIABLE;
  switch (code) {
    case BAKE_CODE:
      defaultBatchSizing = batching.NONE;
    case SHAPE_CODE:
      batchTypes = [batching.FIXED];
      defaultBatchSizing = batching.FIXED;
    case WEIGH_CODE:
      batchTypes = [];
      defaultBatchSizing = batching.NONE;
  }
  return {
    code: code,
    label: string.capitalize(code),
    sequence: sequence,
    hasItemWeight: code === SHAPE_CODE,
    hasItemsPerBatch: code === SHAPE_CODE,
    isCounted: isCounted,
    isWeighed: !isCounted,
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
    requiresIngredients: requiresIngredients,
    isWeigh: code === WEIGH_CODE,
    isMix: code === MIX_CODE,
    isFerment: code === FERMENT_CODE,
    isLayer: code === LAYER_CODE,
    isShape: code === SHAPE_CODE,
    isBake: code === BAKE_CODE,
    isAssemble: code === ASSEMBLE_CODE,
    isDecorate: code === DECORATE_CODE
  };
}

var weigh = instantiate(WEIGH_CODE, 1);
var mix = instantiate(MIX_CODE, 2);
var ferment = instantiate(FERMENT_CODE, 3);
var layer = instantiate(LAYER_CODE, 4);
var shape = instantiate(SHAPE_CODE, 5);
var bake = instantiate(BAKE_CODE, 6);
var assemble = instantiate(ASSEMBLE_CODE, 7);
var decorate = instantiate(DECORATE_CODE, 8);
var all = [weigh, mix, ferment, layer, shape, bake]; // assemble decorate
// const PREBAKE = [weigh, mix, ferment, layer, shape]
var DEFAULT = bake;

var map = {};
all.forEach(function (x) {
  x.inputs = getInputStages(x.code);
  x.outputs = getOutputStages(x.code);
  map[x.code] = x;
});

function getInputStages(code) {
  switch (code) {
    case WEIGH_CODE:
      return [];
    case MIX_CODE:
      return [weigh, mix];
    case FERMENT_CODE:
      return [layer]; // why not mix ?
    case LAYER_CODE:
      return [weigh, mix];
    case SHAPE_CODE:
      return [mix, layer];
    case BAKE_CODE:
      return [weigh, shape];
    case ASSEMBLE_CODE:
      return [weigh, mix, shape, bake];
    case DECORATE_CODE:
      return [weigh, mix, shape, bake, assemble];
    default:
      throw new Error('invalid stage code ' + code);
  }
}

function getOutputStages(code) {
  switch (code) {
    case WEIGH_CODE:
      return [mix, ferment, layer, shape, bake];
    case MIX_CODE:
      return [ferment, layer, shape, bake];
    case FERMENT_CODE:
      return [mix, layer, shape, bake];
    case LAYER_CODE:
      return [mix, ferment, shape, bake];
    case SHAPE_CODE:
      return [mix, ferment, layer, bake];
    case BAKE_CODE:
      return [assemble, decorate];
    case ASSEMBLE_CODE:
      return [decorate];
    case DECORATE_CODE:
      return [];
    default:
      throw new Error('invalid stage code ' + code);
  }
}

export default {
  WEIGH_CODE: WEIGH_CODE,
  MIX_CODE: MIX_CODE,
  FERMENT_CODE: FERMENT_CODE,
  LAYER_CODE: LAYER_CODE,
  SHAPE_CODE: SHAPE_CODE,
  BAKE_CODE: BAKE_CODE,
  ASSEMBLE_CODE: ASSEMBLE_CODE,
  DECORATE_CODE: DECORATE_CODE,
  weigh: weigh,
  mix: mix,
  ferment: ferment,
  layer: layer,
  shape: shape,
  bake: bake,
  assemble: assemble,
  decorate: decorate,
  all: all,
  map: map,
  DEFAULT: DEFAULT
};
//# sourceMappingURL=stages.js.map