"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/*
Product status:
  * finished
  * ingredient

Status properties
{
  code,
  label,
  isFinished,
  isIngredient
}
*/
const FINISHED_CODE = 'F';
const INGREDIENT_CODE = 'I';

function instantiate(code, label) {
  return {
    code: code,
    label: label,
    isFinished: code === FINISHED_CODE,
    isIngredient: code === INGREDIENT_CODE
  };
}

const finished = instantiate(FINISHED_CODE, 'Finished');
const ingredient = instantiate(INGREDIENT_CODE, 'Ingredient');
const all = [finished, ingredient];
const map = {};
all.forEach(x => map[x.code] = x);
var _default = {
  FINISED_CODE,
  INGREDIENT_CODE,
  finished,
  ingredient,
  all,
  map
};
exports.default = _default;
//# sourceMappingURL=status.js.map