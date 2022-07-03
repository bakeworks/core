function parseIntArray (csv) {
  return csv.split(',').map(i => parseInt(i))
}

export default  {
  parseIntArray
}
