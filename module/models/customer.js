module.exports = {
  hasXeroInvoicing: customer => {
    return customer.xero_invoicing === 'Y';
  },

  setXeroInvoicing: (customer, _bool) => {
    return customer.xero_invoicing = _bool ? 'Y' : 'N';
  },

  hasDelivery: customer => {
    customer.delivery_run.length > 0;
  },

  hasXeroId: customer => {
    return customer.xero_invoicing !== undefined && customer.xero_invoicing.length > 0;
  }
};
//# sourceMappingURL=customer.js.map