import handler from "../index";
import { test, expect,beforeAll } from "@jest/globals";
import { dbClient, TableNames, UserRoles } from "./../src/common/db";

beforeAll(async () => {
  await dbClient
    .put({
      TableName: TableNames.users,
      Item: {
        pk: "123",
        role: UserRoles.sysadmin,
      },
    })
    .promise();

  await dbClient
    .put({
      TableName: TableNames.actions,
      Item: {
        pk: "1",
        handler: "COUNTER",
        role: UserRoles.basicuser,
      },
    })
    .promise();
});

test("Disallowed - No Action", async () => {
  await dbClient
    .put({
      TableName: TableNames.users,
      Item: {
        pk: "123",
        role: UserRoles.basicuser,
      },
    })
    .promise();

  const response = await handler({
    Headers: { userid: "123" },
    body: JSON.stringify({ actionid: "999" }), // Non-existent action
  });

  expect(response.statusCode).toBe(403); // Assuming the same response for non-existent action

  await dbClient
    .delete({
      TableName: TableNames.users,
      Key: { pk: "123" },
    })
    .promise();
});

test("Disallowed - No User", async () => {
  await dbClient
    .put({
      TableName: TableNames.actions,
      Item: {
        pk: "1",
        handler: "COUNTER",
        role: UserRoles.enterprise,
      },
    })
    .promise();

  const response = await handler({
    Headers: { userid: "999" }, // Non-existent user
    body: JSON.stringify({ actionid: "1" }),
  });

  expect(response.statusCode).toBe(403); // Assuming the same response for non-existent user

  await dbClient
    .delete({
      TableName: TableNames.actions,
      Key: { pk: "1" },
    })
    .promise();
});

test("Disallowed - No User or Action", async () => {
  const response = await handler({
    Headers: { userid: "999" }, // Non-existent user
    body: JSON.stringify({ actionid: "999" }), // Non-existent action
  });

  expect(response.statusCode).toBe(403); // Assuming the same response for non-existent user and action
});

test("Allowed - Valid User and Action", async () => {
  await dbClient
    .put({
      TableName: TableNames.users,
      Item: {
        pk: "234",
        role: UserRoles.sysadmin,
      },
    })
    .promise();

  await dbClient
    .put({
      TableName: TableNames.actions,
      Item: {
        pk: "1",
        handler: "COUNTER",
        role: UserRoles.basicuser,
      },
    })
    .promise();

  const response = await handler({
    Headers: { userid: "234" },
    body: JSON.stringify({ actionid: "1" }),
  });

  expect(response.statusCode).toBe(200);

  await dbClient
    .delete({
      TableName: TableNames.users,
      Key: { pk: "234" },
    })
    .promise();

  await dbClient
    .delete({
      TableName: TableNames.actions,
      Key: { pk: "1" },
    })
    .promise();
});
