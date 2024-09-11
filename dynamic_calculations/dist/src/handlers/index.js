"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const counter_1 = __importDefault(require("./counter"));
const newest_1 = __importDefault(require("./newest"));
class Handler {
  static from(input) {
    switch (input) {
      case "COUNTER":
        return counter_1.default;
      case "NEWEST":
        return newest_1.default;
      default:
        throw new Error(`No handler found for rule ${input} `);
    }
  }
}
exports.default = Handler;
