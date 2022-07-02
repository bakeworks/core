/*
** HOW BAKERY DOES ITS ACCOUNTING
*/

const PLATFORMS = {
  xero: {
    code: 'xero',
    name: 'Xero',
    webUrl: 'https://www.xero.com/',
    apiUrl: {
      global: 'https://api.xero.com/api.xro/2.0'
    }
  },
  myob: {
    code: 'myob',
    name: 'MYOB',
    webUrl: 'https://www.myob.com/',
    apiUrl: {
      au: 'https://api.myob.com/au',
      nz: 'https://api.myob.com/nz'
    }
  },
  quickbooks: {
    code: 'quickbooks',
    name: 'Quick Books'
  },
}

const SUPPORTED_PLATFORM_CODES = [
  'xero',
]

export default {
  PLATFORMS,
  SUPPORTED_PLATFORM_CODES
}
