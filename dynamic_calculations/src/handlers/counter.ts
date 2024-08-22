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

export default Counter;
