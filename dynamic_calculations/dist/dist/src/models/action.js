"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.Action = void 0;
const role_1 = __importDefault(require("./role"));
const db_1 = require("../common/db");
const index_1 = __importDefault(require("../handlers/index"));
class Action {
  constructor(input) {
    this.id = input.id;
    this.parentRule = input.parentRule;
    this.parentRuleId = input.parentRuleId;
    this.role = role_1.default.from(input.role);
    this.handler = index_1.default.from(input.handler);
  }
  static async getById(id) {
    const res = (
      await db_1.dbClient.get({ TableName: db_1.TableNames.authRules, Key: { pk: id } }).promise()
    ).Item;
    if (!res.Item) {
      throw new Error("Action does not exist");
    }
    return new Action(res.Item);
  }
  async getParentAction() {
    const res = (
      await db_1.dbClient
        .get({ TableName: db_1.TableNames.actions, Key: { pk: this.parentRuleId } })
        .promise()
    ).Item;
    if (!res.Item) {
      throw new Error("Rule does not exist");
    }
    return new Action(res.Item);
  }
  async getChildActions() {
    const res = await db_1.dbClient
      .query({
        TableName: db_1.TableNames.actions,
        IndexName: "parent-index",
        ExclusiveStartKey: { pk: this.parentActionId },
      })
      .promise();
    if (!res.Items) {
      throw new Error("Action does not exist");
    }
    return res.Items.map((item) => new Action(item));
  }
}
exports.Action = Action;
