// src/models/user.ts

import { dbClient, TableNames } from "../common/db";
import Role from "./role";

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

  static async getById(id: string): Promise<User | null> {
    try {
      const res = await dbClient.get({ TableName: TableNames.users, Key: { pk: id } }).promise();
      const item = res.Item;

      if (!item) {
        return null;
      }

      const role = Role.from(item.role as string);

      if (!role) {
        throw new Error("Invalid role from database");
      }

      return new User({
        id: item.pk as string,
        role: role,
      });
    } catch (error) {
      console.error("Error al obtener el usuario:", error);
      return null;
    }
  }
}
