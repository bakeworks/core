import { v2 as schemaV2, v3 as schemaV3 } from './schemas/index.js'

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
// console.debug(`target.js: v3=${v3}  v3=${v3}  v3.dbs=${v3.dbs}  v3.dbs.bakeworks=${v3.dbs.bakeworks}  v3.dbs.bakeworks.collections=${v3.dbs.bakeworks.collections}`)
for (const [key, coll] of Object.entries(schemaV3.dbs.bakeworks.collections)) {
  bakeworks[key] = {
    schemaName: schemaV3.name,
    dbName: schemaV3.dbs.bakeworks.name,
    collName: coll.name
  }
}

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
for (const [key, coll] of Object.entries(schemaV3.dbs.bakeworks.collections)) {
  bakery[key] = bakeryid => {
    return {
      schemaName: schemaV3.name,
      dbName: `bakery-${bakeryid}`,
      collName: coll.name
    }
  }
}

/* Legacy V2 target collection : EXAMPLE USAGE
**
** import target from 'bakeworks-core/src/db/target'
**
** `target.legacy.tbsByron.ingredients
**
** will yield
**
** `{ schemaName: 'v2', dbName: 'tbs-byron', collName: 'ingredients' }`
*/
const legacyV2 = {}
for (const db of Object.values(schemaV2.dbs)) {
  for (const [key, coll] of Object.entries(db.collections)) {
    legacyV2[key] = {
      schemaName: schemaV2.name,
      dbName: db.name,
      collName: coll.name
    }
  }
}

const adminDb = {
  schemaName: schemaV3.name,
  dbName: 'admin',
}

export default {
  schemas: { v2: schemaV2, v3: schemaV3 },
  resolve,
  bakeworks,
  bakery,
  legacyV2,
  adminDb
}

