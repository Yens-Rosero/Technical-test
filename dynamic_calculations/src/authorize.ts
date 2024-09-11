import { User } from "./models/user";
import { Action } from "./models/action";
import Role from "./models/role";

const roleHierarchy: Record<symbol, number> = {
  [Role.SYS_ADMIN]: 3,
  [Role.LOCAL_ADMIN]: 2,
  [Role.ENTERPRISE_USER]: 1,
  [Role.BASIC_USER]: 0,
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
