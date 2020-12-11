const $string = require('../util/string.js')

module.exports = {
  hasXeroInvoicing: customer => {
    return customer.xero_invoicing === 'Y'
  },
  
  setXeroInvoicing: (customer, _bool) => {
    return customer.xero_invoicing = _bool ? 'Y' : 'N'
  },
  
  hasDelivery: customer => {
    customer.delivery_run.length > 0
  },
  
  hasXeroId: customer => {
    return customer.xero_invoicing !== undefined && customer.xero_invoicing.length > 0
  },

  sortCustomers: (customers, prop = 'name') => {
    return customers.sort((a, b) => $string.cmp(a[prop], b[prop]))
  }
}
