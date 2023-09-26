// src/adapter/aws-lambda/handler.ts
import crypto from "crypto";
import { encodeBase64 } from "../../utils/encode.js";
globalThis.crypto ?? (globalThis.crypto = crypto);
var getRequestContext = (event) => {
  return event.requestContext;
};
var handle = (app) => {
  return async (event) => {
    const req = createRequest(event);
    const requestContext = getRequestContext(event);
    const res = await app.fetch(req, { requestContext });
    return createResult(res);
  };
};
var createResult = async (res) => {
  const contentType = res.headers.get("content-type");
  let isBase64Encoded = contentType && isContentTypeBinary(contentType) ? true : false;
  if (!isBase64Encoded) {
    const contentEncoding = res.headers.get("content-encoding");
    isBase64Encoded = isContentEncodingBinary(contentEncoding);
  }
  let body;
  if (isBase64Encoded) {
    const buffer = await res.arrayBuffer();
    body = encodeBase64(buffer);
  } else {
    body = await res.text();
  }
  const result = {
    body,
    headers: {},
    statusCode: res.status,
    isBase64Encoded
  };
  res.headers.forEach((value, key) => {
    result.headers[key] = value;
  });
  return result;
};
var createRequest = (event) => {
  const queryString = extractQueryString(event);
  const urlPath = `https://${event.requestContext.domainName}${isProxyEvent(event) ? event.path : event.rawPath}`;
  const url = queryString ? `${urlPath}?${queryString}` : urlPath;
  const headers = new Headers();
  for (const [k, v] of Object.entries(event.headers)) {
    if (v)
      headers.set(k, v);
  }
  const method = "httpMethod" in event ? event.httpMethod : event.requestContext.http.method;
  const requestInit = {
    headers,
    method
  };
  if (event.body) {
    requestInit.body = event.isBase64Encoded ? Buffer.from(event.body, "base64") : event.body;
  }
  return new Request(url, requestInit);
};
var extractQueryString = (event) => {
  if (isProxyEvent(event)) {
    return Object.entries(event.queryStringParameters || {}).filter(([, value]) => value).map(([key, value]) => `${key}=${value}`).join("&");
  }
  return isProxyEventV2(event) ? event.rawQueryString : event.rawQueryString;
};
var isProxyEvent = (event) => {
  return Object.prototype.hasOwnProperty.call(event, "path");
};
var isProxyEventV2 = (event) => {
  return Object.prototype.hasOwnProperty.call(event, "rawPath");
};
var isContentTypeBinary = (contentType) => {
  return !/^(text\/(plain|html|css|javascript|csv).*|application\/(.*json|.*xml).*|image\/svg\+xml)$/.test(
    contentType
  );
};
var isContentEncodingBinary = (contentEncoding) => {
  if (contentEncoding === null) {
    return false;
  }
  return /^(gzip|deflate|compress|br)/.test(contentEncoding);
};
export {
  handle,
  isContentEncodingBinary,
  isContentTypeBinary
};
