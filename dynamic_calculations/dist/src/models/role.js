"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Role {
  static from(input) {
    if (input === Role.SYS_ADMIN.description) return Role.SYS_ADMIN;
    if (input === Role.LOCAL_ADMIN.description) return Role.LOCAL_ADMIN;
    if (input === Role.ENTERPRISE_USER.description) return Role.ENTERPRISE_USER;
    if (input === Role.BASIC_USER.description) return Role.BASIC_USER;
    return undefined;
  }
  static getDescription(role) {
    if (role === Role.SYS_ADMIN) return Role.SYS_ADMIN.description;
    if (role === Role.LOCAL_ADMIN) return Role.LOCAL_ADMIN.description;
    if (role === Role.ENTERPRISE_USER) return Role.ENTERPRISE_USER.description;
    if (role === Role.BASIC_USER) return Role.BASIC_USER.description;
    return "";
  }
}
Role.SYS_ADMIN = Symbol("sysadmin");
Role.LOCAL_ADMIN = Symbol("localadmin");
Role.ENTERPRISE_USER = Symbol("enterpriseuser");
Role.BASIC_USER = Symbol("basicuser");
exports.default = Role;
