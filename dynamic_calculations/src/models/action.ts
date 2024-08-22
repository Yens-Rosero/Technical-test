import { dbClient, TableNames } from "../common/db";

export class Action {
  id: string;
  parentActionId: string;
  parentRule: string;
  parentRuleId: string;
  role: string;
  handler: string;

  constructor(input: any) {
    this.id = input.pk;
    this.parentActionId = input.parent || "";
    this.parentRule = input.parentRule || "";
    this.parentRuleId = input.parentRuleId || "";
    this.role = input.role || "";
    this.handler = input.handler || "";
  }

  static async getById(id: string): Promise<Action> {
    try {
      const params = {
        TableName: TableNames.actions,
        Key: { pk: id },
      };

      const res = await dbClient.get(params).promise();

      if (!res || !res.Item) {
        throw new Error(`Action with ID ${id} does not exist`);
      }

      return new Action(res.Item);
    } catch (error) {
      console.error(`Error fetching action with ID ${id}:`, error);
      throw error;
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

      if (!res || !res.Items || res.Items.length === 0) {
        return [];
      }

      return res.Items.map((item) => new Action(item));
    } catch (error) {
      console.error(`Error fetching child actions for parentActionId ${this.id}:`, error);
      throw error;
    }
  }
}
