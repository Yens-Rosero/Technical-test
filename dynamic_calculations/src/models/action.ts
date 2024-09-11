// src/models/action.ts

import { dbClient, TableNames } from "../common/db";
import Role from "./role";

interface ActionInput {
  id: string;
  parentActionId: string;
  parentRule: string;
  parentRuleId: string;
  role: symbol;
  handler: string;
}

export class Action {
  id: string;
  parentActionId: string;
  parentRule: string;
  parentRuleId: string;
  role: symbol;
  handler: string;

  constructor(input: ActionInput) {
    this.id = input.id;
    this.parentActionId = input.parentActionId || "";
    this.parentRule = input.parentRule || "";
    this.parentRuleId = input.parentRuleId || "";
    this.role = input.role;
    this.handler = input.handler || "";
  }

  static async getById(id: string): Promise<Action | null> {
    try {
      const params = {
        TableName: TableNames.actions,
        Key: { pk: id },
      };

      const res = await dbClient.get(params).promise();
      const item = res.Item;

      if (!item) {
        return null;
      }

      const role = Role.from(item.role as string);

      if (!role) {
        throw new Error("Invalid role from database");
      }

      return new Action({
        id: item.pk as string,
        parentActionId: item.parent || "",
        parentRule: item.parentRule || "",
        parentRuleId: item.parentRuleId || "",
        role: role,
        handler: item.handler || "",
      });
    } catch (error) {
      return null;
    }
  }

  async getChildActions(): Promise<Action[]> {
    try {
      const params = {
        TableName: TableNames.actions,
        IndexName: "parent-index",
        KeyConditionExpression: "parent = :parent",
        ExpressionAttributeValues: {
          ":parent": this.id,
        },
      };

      const res = await dbClient.query(params).promise();

      return (
        res.Items?.map((item) => {
          const role = Role.from(item.role as string);

          if (!role) {
            throw new Error("Invalid role from database");
          }

          return new Action({
            id: item.pk as string,
            parentActionId: item.parent || "",
            parentRule: item.parentRule || "",
            parentRuleId: item.parentRuleId || "",
            role: role,
            handler: item.handler || "",
          });
        }) || []
      );
    } catch (error) {
      throw error;
    }
  }
}
