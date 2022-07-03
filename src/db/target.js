import { v3 } from './schemas/index.js'

// args: { schemaName, dbName, collName }
// if schemaName is undefined set to V3 schema name
// return object { schemaName, dbName, collName }
function resolve(args) {
  const { schemaName = v3.name, dbName, collName } = args
  return { schemaName, dbName, collName }
}

/* BAKEWORKS : EXAMPLE USAGE
**
** import target from 'bakeworks-core/src/db/target'
**
** `target.bakeworks.bakeries`
**
** will yield
**
** `{ schemaName: 'v3', dbName: 'bakeworks', collName: 'bakeries' }`
*/
const bakeworks = {}
console.debug(`target.js: Object=${Object} v3=${v3}`)
Object.entries(v3.dbs.bakeworks.collections).forEach(([key, coll]) => {
  bakeworks[key] = {
    schemaName: v3.name,
    dbName: v3.dbs.bakeworks,
    collName: coll.name
  }
})

/* BAKERY : EXAMPLE USAGE
**
** import target from 'bakeworks-core/src/db/target'
**
** `target.bakery.recipes(bakeryId)`
**
** will yield
**
** `{ schemaName: 'v3', dbName: 'bakeryId', collName: 'recipes' }`
*/
const bakery = {}
Object.entries(v3.dbs.bakery.collections).forEach(([key, coll]) => {
  bakery[key] = bakeryid => {
    return {
      schemaName: v3.name,
      dbName: bakeryid,
      collName: coll.name
    }
  }
})

export default {
  resolve,
  bakeworks,
  bakery,
}
