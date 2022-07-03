function capitalise(str) {
  return `${str[0].toUpperCase()}${str.slice(1)}`
}

function pluralise (count, singular, plural) {
  if (count === 1) {
    return singular
  } else {
    return plural === undefined ? singular + 's' : plural
  }
}

// returns string with only the digits from given string
function digits (string) {
  return string.replace(/\D/g, '') // \D is anything but a digit
}

function camelCase(s) {
  return s.replace(/([-_][a-z])/ig, ($1) => {
    return $1.toUpperCase()
      .replace('-', '')
      .replace('_', '');
  })
}

// TODO: locale
function cmp (_a, _b, ignorecase = true) {
  const a = ignorecase ? _a.toUpperCase() : _a
  const b = ignorecase ? _b.toUpperCase() : _b
  return a < b ? -1 : (a > b ? 1 : 0)
}

const eq = (a, b, ignorecase = true) => cmp(a, b, ignorecase) === 0
const lt = (a, b, ignorecase = true) => cmp(a, b, ignorecase) === -1
const le = (a, b, ignorecase = true) => cmp(a, b, ignorecase) <= 0
const gt = (a, b, ignorecase = true) => cmp(a, b, ignorecase) === 1
const ge = (a, b, ignorecase = true) => cmp(a, b, ignorecase) >= 0

export default  {
  capitalise,
  camelCase,
  pluralise,
  digits,
  cmp,
  eq,
  lt,
  le,
  gt,
  ge
}
