/* eslint-disable max-len */
import BAKEWORKS_COLLECTIONS from './collections/bakeworks.js'
import BAKERY_COLLECTIONS from './collections/bakery.js'

/*
** V3 is read/write
*/

export default {
  name: 'v3', // local domain name
  dbs: {
    // this is our admin database
    bakeworks: {
      name: 'bakeworks',
      collections: BAKEWORKS_COLLECTIONS
    },
    // the mongo name is the bakery id from bakeworks db
    bakery: {
      name: '[bakeworks.bakeries._id]',
      collections: BAKERY_COLLECTIONS
    },
  }
}
