import { dbClient, TableNames } from "../common/db";

class Newest {
  static async handle(): Promise<any> {
    try {
      const result = await dbClient.scan({ TableName: TableNames.actions }).promise();
      if (!result.Items || result.Items.length === 0) {
        return {}; // Return an empty object if no items are found
      }

      // Find the item with the latest timestamp
      const newestItem = result.Items.reduce(
        (latest, item) => {
          // Default timestamp to a very early date if it's empty
          const timestamp = item.data?.timestamp ? new Date(item.data.timestamp) : new Date(0);

          if (!latest.timestamp || timestamp > latest.timestamp) {
            return { ...item, timestamp }; // Include the entire item
          }
          return latest;
        },
        { timestamp: new Date(0) } as { timestamp?: Date; [key: string]: any },
      );

      // Extract the relevant fields and put them in a new object
      const { timestamp, data } = newestItem;
      const resultData = {
        timestamp: timestamp?.toISOString(),
        color: data?.color,
        type: data?.type,
      };

      return resultData;
    } catch (error) {
      console.error("Error fetching newest item", error);
      throw new Error("Unable to fetch newest item");
    }
  }
}

export default Newest;
