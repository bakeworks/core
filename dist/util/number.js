"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const HEX_DIGITS = '0123456789ABCDEF';

function isMultiple(numerator, denominator) {
  return denominator !== 0 && numerator % denominator === 0;
}

var _default = {
  HEX_DIGITS,
  isMultiple
};
exports.default = _default;
//# sourceMappingURL=number.js.map