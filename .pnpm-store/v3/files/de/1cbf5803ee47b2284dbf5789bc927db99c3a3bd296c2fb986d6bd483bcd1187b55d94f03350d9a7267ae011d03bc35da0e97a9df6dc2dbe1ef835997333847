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
var body_exports = {};
__export(body_exports, {
  parseBody: () => parseBody
});
module.exports = __toCommonJS(body_exports);
const parseBody = async (request) => {
  let body = {};
  const contentType = request.headers.get("Content-Type");
  if (contentType && (contentType.startsWith("multipart/form-data") || contentType.startsWith("application/x-www-form-urlencoded"))) {
    const formData = await request.formData();
    if (formData) {
      const form = {};
      formData.forEach((value, key) => {
        form[key] = value;
      });
      body = form;
    }
  }
  return body;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  parseBody
});
