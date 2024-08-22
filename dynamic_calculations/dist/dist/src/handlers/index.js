"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const counter_1 = __importDefault(require("./counter"));
class Handler {
  static from(input) {
    if (input.rule === "COUNTER") return counter_1.default;
  }
}
exports.default = Handler;
