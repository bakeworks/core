/*
** HOW BAKERIES AS SUBSCRIBERS PAY BAKEWORKS
** HOW CUSTOMERS PAY A BAKERY
*/

const METHODS = {
  ETF_14_DAY: {
    code: 'ETF_14_DAY',
    name: 'Electronic Funds Transfer - 14 Days',
  },
  ETF_30_DAY: {
    code: 'ETF_30_DAY',
    name: 'Electronic Funds Transfer - 30 Days',
  },
  ETF_PP: {
    code: 'ETF_PP',
    name: 'Electronic Funds Transfer - Prepay',
  },
  CC_DD: {
    code: 'CC_DD',
    name: 'Credit Card - Direct Debit',
  },
  CC_PP: {
    code: 'CC_PP',
    name: 'Credit Card - Prepay',
  }
}


const PLATFORMS = {
  BANK: {
    code: 'BANK',
    name: 'Bank'
  },
  STRIPE: {
    code: 'STRIPE',
    name: 'Stripe',
    webUrl: 'https://www.stripe.com/',
    apiUrl: {
      global: 'https://api.stripe.com/v1/'
    }
  },
  SHOPIFY: {
    code: 'SHOPIFY',
    name: 'Shopify'
  }
}

export default {
  METHODS,
  PLATFORMS
}
