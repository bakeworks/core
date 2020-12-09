export function capitalize(str) {
  return `${str[0].toUpperCase()}${str.slice(1)}`
}

export function camelCase(s) {
  return s.replace(/([-_][a-z])/ig, ($1) => {
    return $1.toUpperCase()
      .replace('-', '')
      .replace('_', '');
  })
}

// TODO: locale
export function cmp (_a, _b, ignorecase = true) {
  const a = ignorecase ? _a.toUpperCase() : _a
  const b = ignorecase ? _b.toUpperCase() : _b
  return a < b ? -1 : (a > b ? 1 : 0)
}

export function eq (a, b, ignorecase = true) {
  return cmp(a, b, ignorecase) === 0
}

export function lt (a, b, ignorecase = true) {
  return cmp(a, b, ignorecase) === -1
}

export function lte (a, b, ignorecase = true) {
  return cmp(a, b, ignorecase) <= 0
}

export function gt (a, b, ignorecase = true) {
  return cmp(a, b, ignorecase) === 1
}

export function gte (a, b, ignorecase = true) {
  return cmp(a, b, ignorecase) >= 1
}

// return string with capitalised first letter
export function cap (s) {
  return s.slice(0, 1).toUpperCase() + s.slice(1)
}

export function pluralise (count, singular, plural) {
  if (count === 1) {
    return singular
  } else {
    return plural === undefined ? singular + 's' : plural
  }
}

// returns string with only the digits from given string
export function digits (string) {
  return string.replace(/\D/g, '') // \D is anything but a digit
}
