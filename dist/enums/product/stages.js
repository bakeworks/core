'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _string = require('../../util/string');

var _string2 = _interopRequireDefault(_string);

var _origins = require('./origins');

var _origins2 = _interopRequireDefault(_origins);

var _status = require('./status');

var _status2 = _interopRequireDefault(_status);

var _batching = require('./batching');

var _batching2 = _interopRequireDefault(_batching);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

const WEIGH_CODE = 'Weigh'; // or scale
const MIX_CODE = 'Mix';
const FERMENT_CODE = 'Ferment'; // bulk/primary fermentation
const LAYER_CODE = 'Layer'; // or fold
// const PRESHAPE_CODE = 'preshape' // or rounding - before rest
// const REST_CODE = 'rest' // before final shape
const SHAPE_CODE = 'Shape'; // or panning
// const PROOF_CODE = 'proof' // or final ferment
const BAKE_CODE = 'Bake';
const ASSEMBLE_CODE = 'Assemble';
const DECORATE_CODE = 'Decorate';

function instantiate(code, sequence) {
  const requiresRecipe = code !== WEIGH_CODE;
  /* baked (finished) products are allowede to have have unspecified ingredients
   * but all other actions with recipe require ingredients */
  const requiresIngredients = requiresRecipe && code !== BAKE_CODE;
  const isInputCounted = code === BAKE_CODE;
  const isCounted = code === SHAPE_CODE || code === BAKE_CODE;
  let batchTypes = _batching2.default.all;
  let defaultBatchSizing = _batching2.default.VARIABLE;
  switch (code) {
    case BAKE_CODE:
      defaultBatchSizing = _batching2.default.NONE;
    case SHAPE_CODE:
      batchTypes = [_batching2.default.FIXED];
      defaultBatchSizing = _batching2.default.FIXED;
    case WEIGH_CODE:
      batchTypes = [];
      defaultBatchSizing = _batching2.default.NONE;
  }
  return {
    code: code,
    label: _string2.default.capitalize(code),
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
    defaultOrigin: code === WEIGH_CODE ? _origins2.default.SUPPLIED : _origins2.default.PRODUCED,
    defaultStatus: code === BAKE_CODE ? _status2.default.FINISHED : _status2.default.INGREDIENT,
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

const weigh = instantiate(WEIGH_CODE, 1);
const mix = instantiate(MIX_CODE, 2);
const ferment = instantiate(FERMENT_CODE, 3);
const layer = instantiate(LAYER_CODE, 4);
const shape = instantiate(SHAPE_CODE, 5);
const bake = instantiate(BAKE_CODE, 6);
const assemble = instantiate(ASSEMBLE_CODE, 7);
const decorate = instantiate(DECORATE_CODE, 8);
const all = [weigh, mix, ferment, layer, shape, bake]; // assemble decorate
// const PREBAKE = [weigh, mix, ferment, layer, shape]
const DEFAULT = bake;

const map = {};
all.forEach(x => {
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
      throw new Error(`invalid stage code ${code}`);
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
      throw new Error(`invalid stage code ${code}`);
  }
}

exports.default = {
  WEIGH_CODE,
  MIX_CODE,
  FERMENT_CODE,
  LAYER_CODE,
  SHAPE_CODE,
  BAKE_CODE,
  ASSEMBLE_CODE,
  DECORATE_CODE,
  weigh,
  mix,
  ferment,
  layer,
  shape,
  bake,
  assemble,
  decorate,
  all,
  map,
  DEFAULT
};
//# sourceMappingURL=stages.js.map