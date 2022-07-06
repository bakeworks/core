import strUtil from '../../../util/string.js'

const hasXeroInvoicing = customer => customer.xeroInvoicing

const setXeroInvoicing = (customer, _bool) => customer.xero_invoicing = _bool

const hasDelivery = customer => customer.deliveryRun.length > 0

const hasXeroId = customer => {
  return customer.xero_invoicing !== undefined && customer.xero_invoicing.length > 0
}

const sortCustomers = (customers, prop = 'name') => {
  return customers.sort((a, b) => strUtil.cmp(a[prop], b[prop]))
}

export default {
  hasDelivery,
  hasXeroInvoicing,
  setXeroInvoicing,
  hasXeroId,
  sortCustomers
}
