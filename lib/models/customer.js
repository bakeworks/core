module.exports = {
  hasXeroInvoicing: function hasXeroInvoicing(customer) {
    return customer.xero_invoicing === 'Y';
  },

  setXeroInvoicing: function setXeroInvoicing(customer, _bool) {
    return customer.xero_invoicing = _bool ? 'Y' : 'N';
  },

  hasDelivery: function hasDelivery(customer) {
    customer.delivery_run.length > 0;
  },

  hasXeroId: function hasXeroId(customer) {
    return customer.xero_invoicing !== undefined && customer.xero_invoicing.length > 0;
  }
};
//# sourceMappingURL=customer.js.map