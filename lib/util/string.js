function capitalise(str) {
  return '' + str[0].toUpperCase() + str.slice(1);
}

function pluralise(count, singular, plural) {
  if (count === 1) {
    return singular;
  } else {
    return plural === undefined ? singular + 's' : plural;
  }
}

// returns string with only the digits from given string
function digits(string) {
  return string.replace(/\D/g, ''); // \D is anything but a digit
}

function camelCase(s) {
  return s.replace(/([-_][a-z])/ig, function ($1) {
    return $1.toUpperCase().replace('-', '').replace('_', '');
  });
}

// TODO: locale
function cmp(_a, _b) {
  var ignorecase = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  var a = ignorecase ? _a.toUpperCase() : _a;
  var b = ignorecase ? _b.toUpperCase() : _b;
  return a < b ? -1 : a > b ? 1 : 0;
}

function eq(a, b) {
  var ignorecase = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  return cmp(a, b, ignorecase) === 0;
}

function lt(a, b) {
  var ignorecase = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  return cmp(a, b, ignorecase) === -1;
}

function lte(a, b) {
  var ignorecase = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  return cmp(a, b, ignorecase) <= 0;
}

function gt(a, b) {
  var ignorecase = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  return cmp(a, b, ignorecase) === 1;
}

function gte(a, b) {
  var ignorecase = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  return cmp(a, b, ignorecase) >= 1;
}

export default {
  capitalise: capitalise,
  camelCase: camelCase,
  pluralise: pluralise,
  digits: digits,
  cmp: cmp,
  eq: eq,
  lt: lt,
  lte: lte,
  gt: gt,
  gte: gte
};
//# sourceMappingURL=string.js.map