const stages = require('../enums/product').stages

function isShape(product) {
  product.action_code === stages.SHAPE.code
}

function hasItemWeight(product) {
  return isShape(product)
}