"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const authorize_1 = __importDefault(require("./src/authorize"));
const calculate_1 = __importDefault(require("./src/calculate"));
const handler = async function (event) {
  const userId = event.Headers.userid;
  const body = JSON.parse(event.body);
  const actionId = body.actionid;
  try {
    const isAuthorized = await (0, authorize_1.default)(userId, actionId);
    if (!isAuthorized) {
      return {
        statusCode: 403,
        body: {
          message: "Unauthorized",
          timestamp: new Date(),
        },
      };
    }
    const calculationResult = await (0, calculate_1.default)(actionId);
    return {
      statusCode: 200,
      body: {
        message: "Authorized",
        result: calculationResult,
        timestamp: new Date(),
      },
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: {
        message: "Internal Server Error",
        timestamp: new Date(),
      },
    };
  }
};
exports.default = handler;
