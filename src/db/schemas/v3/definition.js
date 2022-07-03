/* eslint-disable max-len */
import BAKEWORKS_COLLECTIONS from './collections/bakeworks'
import BAKERY_COLLECTIONS from './collections/bakery'

/*
** V3 is read/write
*/

export default {
  name: 'v2', // local domain name
  dbs: {
    // this is our admin database
    bakeworks: {
      name: 'bakeworks',
      collections: BAKEWORKS_COLLECTIONS
    },
    // the mongo name is the bakery id from bakeworks db
    bakery: {
      name: '[bakeworks.bakeries._id]',
      BAKERY_COLLECTIONS
    },
  }
}
