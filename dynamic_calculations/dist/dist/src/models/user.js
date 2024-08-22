"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const db_1 = require("../common/db");
const role_1 = __importDefault(require("./role"));
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
      id: item.id,
      role: role_1.default.from(item.role) || role_1.default.BASIC_USER,
    });
  }
}
exports.User = User;
