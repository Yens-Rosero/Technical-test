import { User } from "./models/user";
import { Action } from "./models/action";
import { UserRoles } from "./../src/common/db";
// assign number depending on hierarchy
const roleHierarchy = {
  [UserRoles.sysadmin]: 3,
  [UserRoles.enterprise]: 2,
  [UserRoles.basicuser]: 1,
};
const authorize = async (userId: string, actionId: string): Promise<boolean> => {
  let user: User | null;
  let action: Action | null;
  try {
    user = await User.getById(userId);
    action = await Action.getById(actionId);
    if (!user || !action) {
      return false;
    }
  } catch (error) {
    return false;
  }

  return roleHierarchy[user.role] >= roleHierarchy[action.role];
};

export default authorize;
