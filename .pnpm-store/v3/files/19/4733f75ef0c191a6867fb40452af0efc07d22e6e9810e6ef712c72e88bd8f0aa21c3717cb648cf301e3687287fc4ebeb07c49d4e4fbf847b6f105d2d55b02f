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
var html_exports = {};
__export(html_exports, {
  html: () => html,
  raw: () => raw
});
module.exports = __toCommonJS(html_exports);
var import_html = require("../../utils/html");
const raw = (value) => {
  const escapedString = new String(value);
  escapedString.isEscaped = true;
  return escapedString;
};
const html = (strings, ...values) => {
  const buffer = [""];
  for (let i = 0, len = strings.length - 1; i < len; i++) {
    buffer[0] += strings[i];
    const children = values[i] instanceof Array ? values[i].flat(Infinity) : [values[i]];
    for (let i2 = 0, len2 = children.length; i2 < len2; i2++) {
      const child = children[i2];
      if (typeof child === "string") {
        (0, import_html.escapeToBuffer)(child, buffer);
      } else if (typeof child === "boolean" || child === null || child === void 0) {
        continue;
      } else if (typeof child === "object" && child.isEscaped || typeof child === "number") {
        buffer[0] += child;
      } else {
        (0, import_html.escapeToBuffer)(child.toString(), buffer);
      }
    }
  }
  buffer[0] += strings[strings.length - 1];
  return raw(buffer[0]);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  html,
  raw
});
