// BakeWorks has its own db of users, client bakeries, ...
module.exports = {
  users: {
    name: 'users',
    fields: {
      _id: 'objectId',
      firstName: 'string',
      lastName: 'string',
      handle: 'string',
      email: 'string',
      emailVerified: 'boolean',
      salt: 'string',
      hash: 'string',
      phone: 'string',
      address1: 'string',
      address2: 'string',
      state: 'string',
      postcode: 'string',
      country: 'string',
      bakeryIds: ['objectId'],
    }
  },
  bakeries: {
    name: 'bakeries',
    fields: {
      _id: 'objectId',
      name: 'string',
      dbV2: 'string',
      subscription: {
        modeCode: 'string',
      },
      payment: {
        methodCode: 'string',
      },
      accounting: {
        platformCode: 'string',
      },
      customer: {
        payment: {
          methodCode: 'string',
          platformCode: 'string',
        }
      },
      users: {
        ids: ['objectId']
      }
    }
  }
}
