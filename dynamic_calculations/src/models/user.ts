import { dbClient, TableNames } from "../common/db";

interface UserInput {
  id: string;
  role: symbol;
}

export class User {
  id: string;
  role: symbol;

  constructor(input: UserInput) {
    this.id = input.id;
    this.role = input.role;
  }

  static async getById(id: string): Promise<User> {
    const res = await dbClient.get({ TableName: TableNames.users, Key: { pk: id } }).promise();
    const item = res.Item;

    if (!item) {
      throw new Error("User does not exist");
    }

    return new User({
      id: item.pk as string,
      role: item.role,
    });
  }
}
