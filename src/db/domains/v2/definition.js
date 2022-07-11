/* eslint-disable max-len */
import collections from './collections.js'

/*
** V2 is read only
*/

export default {
  name: 'v2', // local domain name
  dbs: {
    tbsByron: {
      name: 'tbsByron',
      mongoName: 'tbs-byron',
      collections
    },
    tbsTweed: {
      name: 'tbsTweed',
      mongoName: 'tbs-tweed',
      collections
    },
    tbsTest: {
      name: 'tbsTest',
      mongoName: 'tbs-test1',
      collections
    },
  }
}
