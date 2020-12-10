/*
Product origins:
  * produced
  * supplied

Origin properties
{
  code,
  label,
  isProduced,
  isSupplied
}
*/

var PRODUCED_CODE = 'P';
var SUPPLIED_CODE = 'S';

function instantiate(code, label) {
  return {
    code: code,
    label: label,
    isProduced: code === PRODUCED_CODE,
    isSupplied: code === SUPPLIED_CODE
  };
}

var produced = instantiate(PRODUCED_CODE, 'Produced');
var supplied = instantiate(SUPPLIED_CODE, 'Supplied');
var all = [supplied, produced];
var map = {};
all.forEach(function (x) {
  return map[x.code] = x;
});
var DEFAULT = produced;

export default {
  PRODUCED_CODE: PRODUCED_CODE,
  SUPPLIED_CODE: SUPPLIED_CODE,
  produced: produced,
  supplied: supplied,
  all: all,
  map: map,
  DEFAULT: DEFAULT
};
//# sourceMappingURL=origins.js.map