// each bakery has its own database
// with these collections
export default {
  permissions: { // 'r' | 'w'
    /*
    fields: {
      _id: 'objectId',
      userId: 'objectId',
      auth: 'string',
      products: 'string', // r/w/x
      customers: 'string', // r/w/x
      orders: 'string', // r/w/x
      invoices: 'string', // r/w/x
      production: {
        recipes: 'string' // r/w/x
        schedules: 'string' // r/w/x
      }
    }
    */
  },
  taxRates: {
    /*
    fields: {
      _id: 'objectId',
      code: 'string', // e.g. NA, GST
      description: 'string',
      value: 'decimal' // 0.0 for no tax : e.g. 0.1 for 10%
    }
    */
  },
  products: { // sales products
    /*
    fields: {
      _id: 'objectId',
      code: 'string',
      name: 'string',
      prices: {
        retail: 'decimal',
        wholesale: 'decimal'
      },
      taxRateId: 'objectId', // GST, VAT, Sales Tax : 0.0 for no tax : e.g. 0.1 for 10%
      images: {
        thumbnail: 'binary',
        small: 'binary',
        medium: 'binary',
        large: 'binary'
      }
    }
    */
  },
  customers: {
    /*
    fields: {
      _id: 'objectId',
      code: 'string',
      name: 'string'
    }
    */
  },
  outlets: {
    /*
    fields: {
      _id: 'objectId',
      code: 'string',
      name: 'string'
    }
    */
  },
  recipes: {
    /*
    fields: {
      _id: 'objectId',
    }
    */
  },
  standingOrders: {
    /*
    fields: {
      _id: 'objectId',
      customerId: 'objectId',
      productId: 'objectId',
    }
    */
  },
  specialOrders: {
    /*
    fields: {
      _id: 'objectId',
      customerId: 'objectId',
      productId: 'objectId',
    }
    */
  },
  productionSchedules: {
    /*
    fields: {
      _id: 'objectId',
      productId: 'objectId',
    }
    */
  },
  xeroAuths: {
    /*
    fields: {
      _id: 'objectId',
      accessToken: 'string',
      refreshToken: 'string',
    }
    */
  }
}
