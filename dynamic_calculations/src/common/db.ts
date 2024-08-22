import { DocumentClient } from "aws-sdk/clients/dynamodb";

const isTest = process.env.JEST_WORKER_ID;

const config = {
  convertEmptyValues: true,
  ...(isTest && {
    endpoint: "http://localhost:9100",
    sslEnabled: false,
    region: "us-west-2",
    credentials: {
      accessKeyId: "fakeMyKeyId",
      secretAccessKey: "fakeSecretAccessKey",
    },
  }),
};

const dbClient = new DocumentClient(config);

enum TableNames {
  users = "users",
  rules = "rule-scenarios",
  authRules = "auth-rule",
  actions = "actions",
}

enum UserRoles {
  basicuser = "basicuser",
  sysadmin = "sysadmin",
  enterprise = "enterpriseuser",
}

export { dbClient, TableNames, UserRoles };
