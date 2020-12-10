import number from './number';

function int() {
  var max = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Number.MAX_SAFE_INTEGER;
  return Math.round(Math.random() * max);
}

function intBetween(min, max) {
  if (min > max) return intBetween(max, min);
  return min + Math.round(Math.random() * (max - min));
}

function element(array) {
  return array[randomInt(array.length)];
}

function property(obj) {
  var keys = Object.keys(obj);
  return obj[element(keys)];
} // Argument may be an array or string (or indexable object with slice() method).
// Returns a new array or string which is a shuffled version of the argument.


function shuffle(arg) {
  var isString = typeof arg === 'string';
  var result = isString ? arg.split('') : arg.slice(0);
  var m = result.length,
      i,
      tmp;

  while (m) {
    i = Math.random() * m-- >>> 0; // faster than round?

    tmp = result[m];
    result[m] = result[i];
    result[i] = tmp;
  }

  return isString ? result.join('') : result;
}

function uuid() {
  var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 16;
  var uuid = '';
  var h = number.HEX_DIGITS.length - 1;

  for (var i = 0; i < length; i++) {
    uuid += number.HEX_DIGITS[randomInt(h)];
  }

  return uuid;
}

export default {
  int: int,
  intBetween: intBetween,
  element: element,
  property: property,
  shuffle: shuffle,
  uuid: uuid
};
//# sourceMappingURL=random.js.map