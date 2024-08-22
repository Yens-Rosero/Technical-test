import Counter from "./counter";
import Newest from "./newest";

class Handler {
  static from(input: string) {
    switch (input) {
      case "COUNTER":
        return Counter;
      case "NEWEST":
        return Newest;
      default:
        throw new Error(`No handler found for rule ${input} `);
    }
  }
}

export default Handler;
