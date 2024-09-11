import { Action } from "./models/action";
import Handler from "./handlers/index";
import Counter from "./handlers/counter";
import Newest from "./handlers/newest";
import { CalculateResult } from "./types";

const calculateAction = async (actionId: string): Promise<CalculateResult> => {
  const action = await Action.getById(actionId);

  if (!action || !action.handler) {
    return {};
  }

  const handlerClass = Handler.from(action.handler);

  if (handlerClass === Counter) {
    const childActions = await action.getChildActions();
    const results = await Promise.all(childActions.map((child) => calculateAction(child.id)));
    return Counter.handle(...results);
  } else if (handlerClass === Newest) {
    return Newest.handle();
  } else {
    throw new Error(`Unknown handler type ${action.handler} for action ${actionId}`);
  }
};

export default calculateAction;
