/*
User groups:
  * administrator
  * manager
  * staff
*/

var ADMINISTRATOR_CODE = 'administrator';
var MANAGER_CODE = 'manager';
var STAFF_CODE = 'staff';

var WRITE_PERMISSION_CODE = 'write'; // implies read
var READ_PERMISSION_CODE = 'read';
var NO_PERMISSION_CODE = 'none';

function instantiate(code, label) {
  var isAdmin = code === ADMINISTRATOR_CODE;
  var isMgr = code === MANAGER_CODE;
  return {
    code: code,
    label: label,
    isAdministrator: isAdmin,
    isManager: isMgr,
    isStaff: code === STAFF_CODE,
    permissions: {
      users: isAdmin ? WRITE_PERMISSION_CODE : NO_PERMISSION_CODE,
      database: isAdmin ? WRITE_PERMISSION_CODE : NO_PERMISSION_CODE,
      logs: isAdmin ? WRITE_PERMISSION_CODE : NO_PERMISSION_CODE,
      products: isAdmin || isMgr ? WRITE_PERMISSION_CODE : READ_PERMISSION_CODE,
      customers: isAdmin || isMgr ? WRITE_PERMISSION_CODE : READ_PERMISSION_CODE,
      orders: isAdmin || isMgr ? WRITE_PERMISSION_CODE : NO_PERMISSION_CODE,
      invoices: isAdmin || isMgr ? WRITE_PERMISSION_CODE : NO_PERMISSION_CODE,
      production_schedules: isAdmin || isMgr ? WRITE_PERMISSION_CODE : READ_PERMISSION_CODE,
      production_runs: READ_PERMISSION_CODE
    }
  };
}

var administrator = instantiate(ADMINISTRATOR_CODE, 'Administrator');
var manager = instantiate(MANAGER_CODE, 'Manager');
var staff = instantiate(STAFF_CODE, 'Staff');
var all = [administrator, manager, staff];
var map = {};
all.forEach(function (x) {
  return map[x.code] = x;
});
var DEFAULT = staff;

module.exports = {
  ADMINISTRATOR_CODE: ADMINISTRATOR_CODE,
  MANAGER_CODE: MANAGER_CODE,
  STAFF_CODE: STAFF_CODE,
  WRITE_PERMISSION_CODE: WRITE_PERMISSION_CODE,
  READ_PERMISSION_CODE: READ_PERMISSION_CODE,
  NO_PERMISSION_CODE: NO_PERMISSION_CODE,
  administrator: administrator,
  manager: manager,
  staff: staff,
  all: all,
  map: map,
  DEFAULT: DEFAULT
};
//# sourceMappingURL=group.js.map