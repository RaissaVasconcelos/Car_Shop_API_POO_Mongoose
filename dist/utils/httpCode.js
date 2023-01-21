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

// src/utils/httpCode.ts
var httpCode_exports = {};
__export(httpCode_exports, {
  HttpCode: () => HttpCode
});
module.exports = __toCommonJS(httpCode_exports);
var HttpCode = /* @__PURE__ */ ((HttpCode2) => {
  HttpCode2[HttpCode2["OK"] = 200] = "OK";
  HttpCode2[HttpCode2["CREATE"] = 201] = "CREATE";
  HttpCode2[HttpCode2["NO_CONTENT"] = 204] = "NO_CONTENT";
  HttpCode2[HttpCode2["BAD_REQUEST"] = 400] = "BAD_REQUEST";
  HttpCode2[HttpCode2["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
  HttpCode2[HttpCode2["NOT_FOUND"] = 404] = "NOT_FOUND";
  HttpCode2[HttpCode2["UNPROCESSABLE_ENTITY"] = 422] = "UNPROCESSABLE_ENTITY";
  HttpCode2[HttpCode2["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
  return HttpCode2;
})(HttpCode || {});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  HttpCode
});
