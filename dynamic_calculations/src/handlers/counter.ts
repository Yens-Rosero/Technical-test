import { Source } from "../types";
class Counter {
  static handle(...sources: Source[]) {
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

export default Counter;
