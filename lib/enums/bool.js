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
var TRUE_CODE = 'T';
var FALSE_CODE = 'F';

function instantiate(code, label) {
  return {
    code: code,
    label: label,
    isTrue: code === TRUE_CODE,
    isFalse: code === FALSE_CODE
  };
}

var all = [instantiate(TRUE_CODE, 'true'), instantiate(FALSE_CODE, 'false')];
var map = {};
all.forEach(function (x) {
  return map[x.code] = x;
});
export default {
  TRUE_CODE: TRUE_CODE,
  FALSE_CODE: FALSE_CODE,
  all: all,
  map: map
};
//# sourceMappingURL=bool.js.map