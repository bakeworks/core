/*
** BAKERY AS SUBSCRIBER TO BAKEWORKS
*/

import subscription from './subscription.js'
import payment from './payment.js'
import bakeryPayment from '../bakery/payment.js'
import bakeryAccounting from '../bakery/accounting.js'

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
