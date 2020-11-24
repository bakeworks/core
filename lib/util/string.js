function capitalize(str) {
  return `${str[0].toUpperCase()}${str.slice(1)}`
}

function camelCase(s) {
  return s.replace(/([-_][a-z])/ig, ($1) => {
    return $1.toUpperCase()
      .replace('-', '')
      .replace('_', '');
  })
}

module.exports = {
  capitalize,
  camelCase
}