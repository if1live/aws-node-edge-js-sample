import fs from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { APIGatewayProxyHandlerV2, APIGatewayProxyResultV2 } from "aws-lambda";
import * as edge from "edge-js";
import * as settings from "./settings.js";

interface Person {
  anInteger: number;
  aNumber: number;
  aString: string;
  aBoolean: boolean;
  aBuffer: Buffer;
  anArray: unknown[];
  anObject: { [key: string]: unknown };
}

const fp = path.resolve(settings.staticPath, "HelloDotNet.dll");
const clrMethod = edge.func<string, Person>({
  assemblyFile: fp,
  typeName: "HelloDotNet.Startup_Person",
  methodName: "InvokeAsync",
});
// TODO: T 붙이는 노가다 줄이기
const clrMethodAsync = promisify<string, Person>(clrMethod);

const executeOrThrow: APIGatewayProxyHandlerV2 = async (event, context) => {
  const files_static = await fs.readdir(settings.staticPath);

  const ts_start = Date.now();
  const result_person = await clrMethodAsync("Hello, .NET Core!");
  const ts_end = Date.now();

  const resp = {
    files_static,
    result_person,
    ts_diff: ts_end - ts_start,
  };

  return {
    statusCode: 200,
    body: JSON.stringify(resp, null, 2),
  };
};

export const dispatch: APIGatewayProxyHandlerV2 = async (
  event,
  context,
  cb,
) => {
  try {
    const result = await executeOrThrow(event, context, cb);
    return result as APIGatewayProxyResultV2;
  } catch (e) {
    if (e instanceof Error) {
      const resp = {
        name: e.name,
        message: e.message,
        stack: e.stack,
      };

      return {
        statusCode: 500,
        body: JSON.stringify(resp, null, 2),
      };
    }

    const resp = {
      name: "UnknownError",
      message: "UnknownError",
      stack: "UnknownError",
    };
    return {
      statusCode: 500,
      body: JSON.stringify(resp, null, 2),
    };
  }
};
