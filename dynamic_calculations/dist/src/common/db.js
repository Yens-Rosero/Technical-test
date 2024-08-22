"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoles = exports.TableNames = exports.dbClient = void 0;
const dynamodb_1 = require("aws-sdk/clients/dynamodb");
const isTest = process.env.JEST_WORKER_ID;
const config = Object.assign({ convertEmptyValues: true }, (isTest && {
    endpoint: "http://localhost:9100",
    sslEnabled: false,
    region: "us-west-2",
    credentials: {
        accessKeyId: "fakeMyKeyId",
        secretAccessKey: "fakeSecretAccessKey",
    },
}));
const dbClient = new dynamodb_1.DocumentClient(config);
exports.dbClient = dbClient;
var TableNames;
(function (TableNames) {
    TableNames["users"] = "users";
    TableNames["rules"] = "rule-scenarios";
    TableNames["authRules"] = "auth-rule";
    TableNames["actions"] = "actions";
})(TableNames || (exports.TableNames = TableNames = {}));
var UserRoles;
(function (UserRoles) {
    UserRoles["basicuser"] = "basicuser";
    UserRoles["sysadmin"] = "sysadmin";
    UserRoles["enterprise"] = "enterpriseuser";
})(UserRoles || (exports.UserRoles = UserRoles = {}));
