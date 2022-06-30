/*
** HOW BAKERY DOES ITS ACCOUNTING
*/

const PLATFORMS = {
  xero: {
    code: 'XERO',
    name: 'Xero',
    webUrl: 'https://www.xero.com/',
    apiUrl: {
      global: 'https://api.xero.com/api.xro/2.0'
    }
  },
  myob: {
    code: 'MYOB',
    name: 'MYOB',
    webUrl: 'https://www.myob.com/',
    apiUrl: {
      au: 'https://api.myob.com/au',
      nz: 'https://api.myob.com/nz'
    }
  },
  quickbooks: {
    code: 'QB',
    name: 'Quick Books'
  },
}
