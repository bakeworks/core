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

var FINISHED_CODE = 'F';
var INGREDIENT_CODE = 'I';

function instantiate(code, label) {
  return {
    code: code,
    label: label,
    isFinished: code === FINISHED_CODE,
    isIngredient: code === INGREDIENT_CODE
  };
}

var finished = instantiate(FINISHED_CODE, 'Finished');
var ingredient = instantiate(INGREDIENT_CODE, 'Ingredient');
var all = [finished, ingredient];
var map = {};
all.forEach(function (x) {
  return map[x.code] = x;
});

export default {
  FINISED_CODE: FINISED_CODE,
  INGREDIENT_CODE: INGREDIENT_CODE,
  finished: finished,
  ingredient: ingredient,
  all: all,
  map: map
};
//# sourceMappingURL=status.js.map