/*
** BAKERY AS SUBSCRIBER TO BAKEWORKS
*/

const subscription = require('./subscription')
const payment = require('./payment')
const bakeryPayment = require('../bakery/payment')
const bakeryAccounting = require('../bakery/accounting')

/*
** Defaults for new bakery
*/
const DEFAULT = {
  name: 'Bakery Name',
  subscription: {
    modeCode: subscription.MODES.fixed.code,
  },
  payment: {
    methodCode: payment.METHODS.etf14Days.code,
  },
  accounting: {
    platformCode: bakeryAccounting.PLATFORMS.xero.code,
  },
  customer: {
    payment: {
      methodCode: bakeryPayment.METHODS.creditCardPrepay.code,
      platformCode: bakeryPayment.PLATFORMS.bank.code,
    }
  },
  users: {
    ids: []
  }
}

export default {
  DEFAULT
}
