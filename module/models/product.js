const {
  origins,
  stages,
  status
} = require('../enums/product');

function populate(product) {
  product.status = status.map[product.status_code];
  product.stage = stages.map[product.action_code];
  product.origin = origins.map[product.origin_code];
}
//# sourceMappingURL=product.js.map