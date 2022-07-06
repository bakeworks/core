// each bakery has its own database
// with these collections
export default {
  permissions: { // 'r' | 'w'
    name: 'permissions',
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
    name: 'taxRates',
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
    name: 'products',
    /*
    fields: {
      _id: 'objectId',
      code: 'string',
      name: 'string',
      xeroId: 'string',
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
    name: 'customers',
    /*
    fields: {
      _id: 'objectId',
      code: 'string',
      name: 'string'
    }
    */
  },
  outlets: {
    name: 'outlets',
    /*
    fields: {
      _id: 'objectId',
      code: 'string',
      name: 'string'
    }
    */
  },
  recipes: {
    name: 'recipes',
    /*
    fields: {
      _id: 'objectId',
    }
    */
  },
  standingOrders: {
    name: 'standingOrders',
    /*
    fields: {
      _id: 'objectId',
      customerId: 'objectId',
      productId: 'objectId',
    }
    */
  },
  specialOrders: {
    name: 'specialOrders',
    /*
    fields: {
      _id: 'objectId',
      customerId: 'objectId',
      productId: 'objectId',
    }
    */
  },
  productionSchedules: {
    name: 'productionSchedules',
    /*
    fields: {
      _id: 'objectId',
      productId: 'objectId',
    }
    */
  },
  xeroAuths: {
    name: 'xeroAuths',
    /*
    fields: {
      _id: 'objectId',
      accessToken: 'string',
      refreshToken: 'string',
    }
    */
  }
}
