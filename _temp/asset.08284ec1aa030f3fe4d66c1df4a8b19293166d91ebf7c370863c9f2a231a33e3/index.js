"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/resources/iterator/iterator_agent.ts
var iterator_agent_exports = {};
__export(iterator_agent_exports, {
  lambdaHandler: () => lambdaHandler
});
module.exports = __toCommonJS(iterator_agent_exports);
var AWS = require("aws-sdk");
var lambda = new AWS.Lambda();
var targetFunctionName = process.env.TARGET_FN_NAME;
var lambdaHandler = async (event) => {
  const index = event.iterator.index + 1;
  const params = {
    FunctionName: targetFunctionName,
    InvocationType: "Event"
  };
  lambda.invoke(params, function(error) {
    if (error) {
      console.log(error, error.stack);
    } else {
      console.log("The target function is triggered.");
    }
  });
  return {
    index,
    continue: index < event.iterator.count,
    count: event.iterator.count
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  lambdaHandler
});
