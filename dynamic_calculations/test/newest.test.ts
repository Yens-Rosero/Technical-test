import handler from "../index";
import { beforeAll, test, expect } from "@jest/globals";
import { dbClient, TableNames, UserRoles } from "./../src/common/db";

beforeAll(async () => {
  // Insert test data into the database
  await dbClient
    .put({
      TableName: TableNames.actions,
      Item: {
        pk: "4",
        role: UserRoles.basicuser,
        handler: "NEWEST",
      },
    })
    .promise();

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
        pk: "2",
        parent: "4",
        data: { timestamp: new Date(2020, 1, 1).toISOString(), color: "red", type: "painting" },
        role: UserRoles.basicuser,
      },
    })
    .promise();

  await dbClient
    .put({
      TableName: TableNames.actions,
      Item: {
        pk: "3",
        parent: "4",
        data: { timestamp: new Date(2010, 1, 1).toISOString(), color: "blue", image: "none" },
        role: UserRoles.basicuser,
      },
    })
    .promise();
});

test("Newest item returns correct data", async () => {
  const { body } = await handler({
    Headers: { userid: "123" },
    body: JSON.stringify({ actionid: "4" }),
  });

  const expectedResult = {
    timestamp: new Date(2020, 1, 1).toISOString(),
    color: "red",
    type: "painting",
  };

  expect(body).toStrictEqual(expect.objectContaining({ result: expectedResult }));
});
