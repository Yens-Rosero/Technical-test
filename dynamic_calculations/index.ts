import { EventPayload, EventBody, ResponseType } from "./src/types";
import authorize from "./src/authorize";
import calculate from "./src/calculate";

const handler = async function (event: EventPayload): Promise<ResponseType> {
  const userId = event.Headers.userid;
  const body: EventBody = JSON.parse(event.body);
  const actionId = body.actionid;

  try {
    const isAuthorized = await authorize(userId, actionId);

    if (!isAuthorized) {
      return {
        statusCode: 403,
        body: {
          message: "Unauthorized",
          timestamp: new Date(),
        },
      };
    }

    const calculationResult = await calculate(actionId);

    return {
      statusCode: 200,
      body: {
        message: "Authorized",
        result: calculationResult,
        timestamp: new Date(),
      },
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: {
        message: "Internal Server Error",
        timestamp: new Date(),
      },
    };
  }
};

export default handler;
