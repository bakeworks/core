
const codes = {
  produced: 'prod',
  supplied: 'supp',
}

const enums = {
  // fix means min === max
  produced: {
    code: codes.produced, label: 'Produced' },
  supplied: {
    code: codes.supplied, label: 'Supplied' },
}

const is = {
  produced: code => code === codes.produced,
  supplied: code => code === codes.supplied
}

module.exports = {
  codes,
  enums,
  is
}

