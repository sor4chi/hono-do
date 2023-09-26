// src/helper/html/index.ts
import { escapeToBuffer } from "../../utils/html.js";
var raw = (value) => {
  const escapedString = new String(value);
  escapedString.isEscaped = true;
  return escapedString;
};
var html = (strings, ...values) => {
  const buffer = [""];
  for (let i = 0, len = strings.length - 1; i < len; i++) {
    buffer[0] += strings[i];
    const children = values[i] instanceof Array ? values[i].flat(Infinity) : [values[i]];
    for (let i2 = 0, len2 = children.length; i2 < len2; i2++) {
      const child = children[i2];
      if (typeof child === "string") {
        escapeToBuffer(child, buffer);
      } else if (typeof child === "boolean" || child === null || child === void 0) {
        continue;
      } else if (typeof child === "object" && child.isEscaped || typeof child === "number") {
        buffer[0] += child;
      } else {
        escapeToBuffer(child.toString(), buffer);
      }
    }
  }
  buffer[0] += strings[strings.length - 1];
  return raw(buffer[0]);
};
export {
  html,
  raw
};
