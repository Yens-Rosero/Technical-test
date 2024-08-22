"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("./models/user");
const action_1 = require("./models/action");
const role_1 = __importDefault(require("./models/role"));
// assign number depending on hierarchy
const roleHierarchy = {
  [role_1.default.SYS_ADMIN]: 4,
  [role_1.default.LOCAL_ADMIN]: 3,
  [role_1.default.ENTERPRISE_USER]: 2,
  [role_1.default.BASIC_USER]: 1,
};
const authorize = async (userId, actionId) => {
  let user;
  let action;
  try {
    user = await user_1.User.getById(userId);
    action = await action_1.Action.getById(actionId);
  } catch (error) {
    console.error("Error fetching user or action", error);
    return false;
  }
  if (!user || !action) {
    // If user is not found or action is not found, return false
    return false;
  }
  //  Checks if the user role is equal to or greater than that required by the action
  return roleHierarchy[user.role] >= roleHierarchy[action.role];
};
exports.default = authorize;
