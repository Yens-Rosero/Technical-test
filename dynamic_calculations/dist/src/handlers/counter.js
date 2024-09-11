"use strict";
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
