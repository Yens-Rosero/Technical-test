import authorize from "./src/authorize";
import calculate from "./src/calculate";


// The event argument passed here:
// {Headers: {userid: string}, body: string} - parsed body contains {actionid: string}
const handler = async function (event): Promise<any> {
  // TODO: authorize
  // TODO: calculate
  return;
};

export default handler;
