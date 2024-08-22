"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("./models/user");
const action_1 = require("./models/action");
const db_1 = require("./../src/common/db");
// assign number depending on hierarchy
const roleHierarchy = {
    [db_1.UserRoles.sysadmin]: 3,
    [db_1.UserRoles.enterprise]: 2,
    [db_1.UserRoles.basicuser]: 1,
};
const authorize = async (userId, actionId) => {
    let user;
    let action;
    try {
        user = await user_1.User.getById(userId);
        action = await action_1.Action.getById(actionId);
        if (!user || !action) {
            return false;
        }
    }
    catch (error) {
        return false;
    }
    return roleHierarchy[user.role] >= roleHierarchy[action.role];
};
exports.default = authorize;
