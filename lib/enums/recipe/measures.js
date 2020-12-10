/*
Product (recipe) measures:
  * bakers
  * actual (percentage)

Origin properties
{
  code,
  label,
  isBakers,
  isActual
}
*/

var BAKERS_CODE = 'B';
var ACTUAL_CODE = 'A';

function instantiate(code, label) {
  return {
    code: code,
    label: label,
    isBakers: code === BAKERS_CODE,
    isActual: code === ACTUAL_CODE
  };
}

var bakers = instantiate(BAKERS_CODE, 'Bakers');
var actual = instantiate(ACTUAL_CODE, 'Actual');
var all = [bakers, actual];
var map = {};
all.forEach(function (x) {
  return map[x.code] = x;
});
var DEFAULT = bakers;

module.exports = {
  BAKERS_CODE: BAKERS_CODE,
  ACTUAL_CODE: ACTUAL_CODE,
  bakers: bakers,
  actual: actual,
  all: all,
  map: map,
  DEFAULT: DEFAULT
};
//# sourceMappingURL=measures.js.map