import { FunctionDefinition, standalone } from "serverless-standalone";
import * as http_main from "./handlers.js";

const definitions: FunctionDefinition[] = [
  {
    name: "http",
    handler: http_main.dispatch,
    events: [
      { httpApi: { route: "ANY /" } },
      { httpApi: { route: "ANY /{pathname+}" } },
    ],
  },
];

const options = {
  httpApi: { port: 3000 },
};

const inst = standalone({
  ...options,
  functions: definitions,
});
await inst.start();
console.log("standalone", options);
