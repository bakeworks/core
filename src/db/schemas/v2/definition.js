/* eslint-disable max-len */
import collections from './collections'

/*
** V2 is read only
*/

module.exports = {
  name: 'v2', // local domain name
  dbs: {
    tbsByron: {
      name: 'tbsByron',
      mongo: { name: 'tbs-byron' },
      collections
    },
    tbsTweed: {
      name: 'tbsTweed',
      mongo: { name: 'tbs-tweed' },
      collections
    },
    tbsTest: {
      name: 'tbsTest',
      mongo: { name: 'tbs-test1' },
      collections
    },
  }
}
