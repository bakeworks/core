/*
** HOW BAKERY CUSTOMERS PAY BAKERY
*/

const METHODS = {
  etfTerm: {
    code: 'ETF-TERM',
    name: 'Funds Transfer Term',
  },
  etfPrepay: {
    code: 'ETF-PP',
    name: 'Funds Transfer Prepay',
  },
  creditCardDirectDebit: {
    code: 'CCDD',
    name: 'Credit Card - Direct Debit',
  },
  creditCardPrepay: {
    code: 'CCPP',
    name: 'Credit Card - Prepay',
  }
}

const PLATFORMS = {
  bank: {
    code: 'BANK',
    name: 'Bank'
  },
  stripe: {
    code: 'STRIPE',
    name: 'Stripe'
  },
  shopify: {
    code: 'SHOPIFY',
    name: 'Shopify'
  }
}

export default {
  METHODS,
  PLATFORMS
}
