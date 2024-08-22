import { Action } from "./models/action";
import Handler from "./handlers/index";
import Counter from "./handlers/counter";
import Newest from "./handlers/newest";

const calculateAction = async (actionId: string) => {
  try {
    const action = await Action.getById(actionId);

    if (!action) {
      throw new Error(`Action with ID ${actionId} not found`);
    }
    if (!action.handler) {
      return 0;
    }

    const handlerClass = Handler.from(action.handler);

    if (handlerClass === Counter) {
      const childActions = await action.getChildActions();

      const results = await Promise.all(childActions.map((child) => calculateAction(child.id)));
      return Counter.handle(...results).result;
    } else if (handlerClass === Newest) {
      const childActions = await action.getChildActions();

      // If there are no child actions, simply return a default value.
      if (childActions.length === 0) {
        console.warn(`No child actions available for the NEWEST handler in action ${actionId}`);
        return 0;
      }

      const results = await Promise.all(
        childActions.map(async (child) => {
          try {
            return await calculateAction(child.id);
          } catch (error) {
            console.error(`Error calculating child action with ID ${child.id}: ${error}`);
            throw error;
          }
        }),
      );

      return Newest.handle();
    } else {
      throw new Error(`Unknown handler type ${action.handler} for action ${actionId}`);
    }
  } catch (error) {
    console.error(`Error in calculateAction with ID ${actionId}: ${error}`);
    throw error;
  }
};

const calculate = async (actionId: string) => {
  try {
    return await calculateAction(actionId);
  } catch (error) {
    console.error(`Error calculating main action with ID ${actionId}: ${error}`);
    throw error;
  }
};

export default calculate;
