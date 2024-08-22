"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Action = void 0;
const db_1 = require("../common/db");
class Action {
    constructor(input) {
        this.id = input.pk;
        this.parentActionId = input.parent || "";
        this.parentRule = input.parentRule || "";
        this.parentRuleId = input.parentRuleId || "";
        this.role = input.role || "";
        this.handler = input.handler || "";
    }
    static async getById(id) {
        try {
            const params = {
                TableName: db_1.TableNames.actions,
                Key: { pk: id },
            };
            const res = await db_1.dbClient.get(params).promise();
            if (!res || !res.Item) {
                throw new Error(`Action with ID ${id} does not exist`);
            }
            return new Action(res.Item);
        }
        catch (error) {
            console.error(`Error fetching action with ID ${id}:`, error);
            throw error;
        }
    }
    async getChildActions() {
        try {
            const params = {
                TableName: db_1.TableNames.actions,
                IndexName: "parent-index",
                KeyConditionExpression: "parent = :parent",
                ExpressionAttributeValues: {
                    ":parent": this.id,
                },
            };
            const res = await db_1.dbClient.query(params).promise();
            if (!res || !res.Items || res.Items.length === 0) {
                return [];
            }
            return res.Items.map((item) => new Action(item));
        }
        catch (error) {
            console.error(`Error fetching child actions for parentActionId ${this.id}:`, error);
            throw error;
        }
    }
}
exports.Action = Action;
