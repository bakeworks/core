/*
User groups:
  * administrator
  * manager
  * staff
*/

const ADMINISTRATOR_CODE = 'administrator'
const MANAGER_CODE = 'manager'
const STAFF_CODE = 'staff'

const WRITE_PERMISSION = 'write' // implies read
const READ_PERMISSION = 'read'
const NO_PERMISSION = 'none'

function instantiate(code, label) {
  const isAdmin = code === ADMINISTRATOR_CODE
  const isMgr = code === MANAGER_CODE
  return {
    code: code,
    label: label,
    isAdministrator: isAdmin,
    isManager: isMgr,
    isStaff: code === STAFF_CODE,
    permissions: {
      users: isAdmin ? WRITE_PERMISSIOM : NO_PERMISSION ,
      database: isAdmin ? WRITE_PERMISSIOM : NO_PERMISSION,
      logs: isAdmin ? WRITE_PERMISSIOM : NO_PERMISSION,
      products: isAdmin || isMgr ? WRITE_PERMISSIOM : READ_PERMISSION,
      customers: isAdmin || isMgr ? WRITE_PERMISSIOM : READ_PERMISSION,
      orders: isAdmin|| isMgr ? WRITE_PERMISSIOM : NO_PERMISSION,
      invoices: isAdmin || isMgr ? WRITE_PERMISSIOM : NO_PERMISSION,
      production_schedules: isAdmin || isMgr ? WRITE_PERMISSIOM : READ_PERMISSION,
      production_runs: READ_PERMISSION,
    }
  }
}

const ADMINISTRATOR = instantiate(ADMINISTRATOR_CODE, 'Administrator')
const MANAGER = instantiate(MANAGER_CODE, 'Manager')
const STAFF = instantiate(STAFF_CODE, 'Staff')
const ALL = [ADMINISTRATOR, MANAGER, STAFF]
const DEFAULT = STAFF
