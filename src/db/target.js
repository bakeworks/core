import { v3 } from '../schemas/index'

// args: { schemaName, dbName, collName }
// if schemaName is undefined set to V3 schema name
// return object { schemaName, dbName, collName }
function resolve(args) {
  const { schemaName = v3.name, dbName, collName } = args
  return { schemaName, dbName, collName }
}

const bakeworks = collName => ({ schemaName = v3.name, dbName: v3.dbs.bakeworks, collName })
const bakery = (bakeryId, collName) => ({ schemaName = v3.name, dbName: bakeryId, collName })\

export default {
  resolve,
  bakeworks,
  bakery,
}
