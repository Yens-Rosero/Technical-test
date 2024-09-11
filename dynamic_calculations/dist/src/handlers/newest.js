"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../common/db");
class Newest {
  static async handle() {
    try {
      const result = await db_1.dbClient.scan({ TableName: db_1.TableNames.actions }).promise();
      if (!result.Items || result.Items.length === 0) {
        return {}; // Return an empty object if no items are found
      }
      // Find the item with the latest timestamp
      const newestItem = result.Items.reduce(
        (latest, item) => {
          var _a;
          // Default timestamp to a very early date if it's empty
          const timestamp = ((_a = item.data) === null || _a === void 0 ? void 0 : _a.timestamp)
            ? new Date(item.data.timestamp)
            : new Date(0);
          if (!latest.timestamp || timestamp > latest.timestamp) {
            return Object.assign(Object.assign({}, item), { timestamp }); // Include the entire item
          }
          return latest;
        },
        { timestamp: new Date(0) },
      );
      // Extract the relevant fields and put them in a new object
      const { timestamp, data } = newestItem;
      const resultData = {
        timestamp: timestamp === null || timestamp === void 0 ? void 0 : timestamp.toISOString(),
        color: data === null || data === void 0 ? void 0 : data.color,
        type: data === null || data === void 0 ? void 0 : data.type,
      };
      return resultData;
    } catch (error) {
      console.error("Error fetching newest item", error);
      throw new Error("Unable to fetch newest item");
    }
  }
}
exports.default = Newest;
