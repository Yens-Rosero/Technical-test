"use strict";
// Counter returns object with `counter` property indicating how many sources were passed
Object.defineProperty(exports, "__esModule", { value: true });
class Counter {
  static handle(...sources) {
    return (sources || []).reduce(
      (acc) => ({
        result: acc.result + 1,
      }),
      {
        result: 0,
      },
    );
  }
}
exports.default = Counter;
