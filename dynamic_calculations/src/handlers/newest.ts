import { dbClient, TableNames } from "../common/db";

interface ItemData {
  timestamp?: string;
  color?: string;
  type?: string;
}

interface NewestItem {
  timestamp?: Date;
  data?: ItemData;
}

class Newest {
  static async handle(): Promise<{ timestamp?: string; color?: string; type?: string }> {
    try {
      const result = await dbClient.scan({ TableName: TableNames.actions }).promise();

      if (!result.Items || result.Items.length === 0) {
        return {};
      }

      const newestItem = result.Items.reduce<NewestItem>(
        (latest, item) => {
          const timestamp = item.data?.timestamp ? new Date(item.data.timestamp) : new Date(0);

          if (!latest.timestamp || timestamp > latest.timestamp) {
            return { ...item, timestamp };
          }
          return latest;
        },
        { timestamp: new Date(0) },
      );

      const { timestamp, data } = newestItem;
      return {
        timestamp: timestamp?.toISOString(),
        color: data?.color,
        type: data?.type,
      };
    } catch (error) {
      throw new Error("Unable to fetch newest item");
    }
  }
}

export default Newest;
