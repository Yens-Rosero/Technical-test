import handler from "../index";
import { test, expect } from "@jest/globals";
import { dbClient, TableNames, UserRoles } from "./../src/common/db";

test("Disallowed", async () => {
  await dbClient
    .put({
      TableName: TableNames.users,
      Item: {
        pk: "123",
        role: UserRoles.basicuser,
      },
    })
    .promise();

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
    Headers: { userid: "123" },
    body: JSON.stringify({ actionid: "1" }),
  });

  expect(response.statusCode).toBe(403);

  await dbClient
    .delete({
      TableName: TableNames.users,
      Key: { pk: "123" },
    })
    .promise();

  await dbClient
    .delete({
      TableName: TableNames.actions,
      Key: { pk: "1" },
    })
    .promise();
});

test("Allowed", async () => {
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
