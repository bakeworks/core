module.exports = {
  product: {
    batching: require('./product/batching'),
    origins: require('./product/origins'),
    status: require('./product/status'),
    stages: require('./product/stages')
  },
  recipe: {
    measure: require('./recipe/measure')
  },
  user: {
    group: require('./user/group')
  },
  bool: require('./bool')
}