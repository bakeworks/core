'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const HEX_DIGITS = '0123456789ABCDEF';

function isMultiple(numerator, denominator) {
  return denominator !== 0 && numerator % denominator === 0;
}

exports.default = {
  HEX_DIGITS,
  isMultiple
};
//# sourceMappingURL=number.js.map