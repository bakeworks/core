"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

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
const TRUE_CODE = 'T';
const FALSE_CODE = 'F';

function instantiate(code, label) {
  return {
    code: code,
    label: label,
    isTrue: code === TRUE_CODE,
    isFalse: code === FALSE_CODE
  };
}

const all = [instantiate(TRUE_CODE, 'true'), instantiate(FALSE_CODE, 'false')];
const map = {};
all.forEach(x => map[x.code] = x);
var _default = {
  TRUE_CODE,
  FALSE_CODE,
  all,
  map
};
exports.default = _default;
//# sourceMappingURL=bool.js.map