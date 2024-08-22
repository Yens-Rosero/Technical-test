"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const action_1 = require("./models/action");
const index_1 = __importDefault(require("./handlers/index"));
const counter_1 = __importDefault(require("./handlers/counter"));
const newest_1 = __importDefault(require("./handlers/newest"));
const calculateAction = async (actionId) => {
    try {
        const action = await action_1.Action.getById(actionId);
        if (!action) {
            throw new Error(`Action with ID ${actionId} not found`);
        }
        if (!action.handler) {
            return 0;
        }
        const handlerClass = index_1.default.from(action.handler);
        if (handlerClass === counter_1.default) {
            const childActions = await action.getChildActions();
            const results = await Promise.all(childActions.map((child) => calculateAction(child.id)));
            return counter_1.default.handle(...results).result;
        }
        else if (handlerClass === newest_1.default) {
            const childActions = await action.getChildActions();
            // If there are no child actions, simply return a default value.
            if (childActions.length === 0) {
                console.warn(`No child actions available for the NEWEST handler in action ${actionId}`);
                return 0;
            }
            const results = await Promise.all(childActions.map(async (child) => {
                try {
                    return await calculateAction(child.id);
                }
                catch (error) {
                    console.error(`Error calculating child action with ID ${child.id}: ${error}`);
                    throw error;
                }
            }));
            return newest_1.default.handle();
        }
        else {
            throw new Error(`Unknown handler type ${action.handler} for action ${actionId}`);
        }
    }
    catch (error) {
        console.error(`Error in calculateAction with ID ${actionId}: ${error}`);
        throw error;
    }
};
const calculate = async (actionId) => {
    try {
        return await calculateAction(actionId);
    }
    catch (error) {
        console.error(`Error calculating main action with ID ${actionId}: ${error}`);
        throw error;
    }
};
exports.default = calculate;
