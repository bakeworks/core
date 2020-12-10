import _typeof from "@babel/runtime/helpers/typeof";

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
      if (_typeof(value) === 'object' && value !== null) {
        if (seen.has(value)) {
          count += 1;
          return "circular#".concat(count, ":").concat(Object.keys(value));
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