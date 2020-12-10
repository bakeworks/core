"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

// handles circular references
function stringify(obj) {
  const b = false;

  if (b) {
    return JSON.stringify(obj);
  }

  const getCircularReplacer = () => {
    const seen = new WeakSet();
    let count = 0;
    return (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (seen.has(value)) {
          count += 1;
          return `circular#${count}:${Object.keys(value)}`;
        }

        seen.add(value);
      }

      return value;
    };
  };

  return JSON.stringify(obj, getCircularReplacer());
}

var _default = {
  stringify
};
exports.default = _default;
//# sourceMappingURL=json.js.map