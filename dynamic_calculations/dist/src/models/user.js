"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const db_1 = require("../common/db");
class User {
  constructor(input) {
    this.id = input.id;
    this.role = input.role;
  }
  static async getById(id) {
    const res = await db_1.dbClient
      .get({ TableName: db_1.TableNames.users, Key: { pk: id } })
      .promise();
    const item = res.Item;
    if (!item) {
      throw new Error("User does not exist");
    }
    return new User({
      id: item.pk,
      role: item.role,
    });
  }
}
exports.User = User;
