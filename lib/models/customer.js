export function hasXeroInvoicing(customer) {
  return customer.xero_invoicing === 'Y'
}

export function setXeroInvoicing(customer, _bool) {
  return customer.xero_invoicing = _bool ? 'Y' : 'N'
}

export function hasDelivery(customer) {
  customer.delivery_run.length > 0
}

export function hasXeroId(customer) {
  return customer.xero_invoicing !== undefined && customer.xero_invoicing.length > 0
}