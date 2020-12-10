var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// handles circular references
function stringify(obj) {
  var b = false;
  if (b) {
    return JSON.stringify(obj);
  }
  var getCircularReplacer = function getCircularReplacer() {
    var seen = new WeakSet();
    var count = 0;
    return function (key, value) {
      if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value !== null) {
        if (seen.has(value)) {
          count += 1;
          return 'circular#' + count + ':' + Object.keys(value);
        }
        seen.add(value);
      }
      return value;
    };
  };
  return JSON.stringify(obj, getCircularReplacer());
}

export default {
  stringify: stringify
};
//# sourceMappingURL=json.js.map