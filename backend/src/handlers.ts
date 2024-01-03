import fs from "node:fs/promises";
import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import * as settings from "./settings.js";

export const dispatch: APIGatewayProxyHandlerV2 = async (event, context) => {
  const results = await fs.readdir(settings.staticPath);
  return {
    statusCode: 200,
    body: JSON.stringify(results, null, 2),
  };
};
