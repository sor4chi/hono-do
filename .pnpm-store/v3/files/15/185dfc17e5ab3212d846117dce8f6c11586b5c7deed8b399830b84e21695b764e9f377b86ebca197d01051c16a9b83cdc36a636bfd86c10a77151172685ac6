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
var secure_headers_exports = {};
__export(secure_headers_exports, {
  secureHeaders: () => secureHeaders
});
module.exports = __toCommonJS(secure_headers_exports);
const HEADERS_MAP = {
  crossOriginEmbedderPolicy: ["Cross-Origin-Embedder-Policy", "require-corp"],
  crossOriginResourcePolicy: ["Cross-Origin-Resource-Policy", "same-origin"],
  crossOriginOpenerPolicy: ["Cross-Origin-Opener-Policy", "same-origin"],
  originAgentCluster: ["Origin-Agent-Cluster", "?1"],
  referrerPolicy: ["Referrer-Policy", "no-referrer"],
  strictTransportSecurity: ["Strict-Transport-Security", "max-age=15552000; includeSubDomains"],
  xContentTypeOptions: ["X-Content-Type-Options", "nosniff"],
  xDnsPrefetchControl: ["X-DNS-Prefetch-Control", "off"],
  xDownloadOptions: ["X-Download-Options", "noopen"],
  xFrameOptions: ["X-Frame-Options", "SAMEORIGIN"],
  xPermittedCrossDomainPolicies: ["X-Permitted-Cross-Domain-Policies", "none"],
  xXssProtection: ["X-XSS-Protection", "0"]
};
const DEFAULT_OPTIONS = {
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: true,
  crossOriginOpenerPolicy: true,
  originAgentCluster: true,
  referrerPolicy: true,
  strictTransportSecurity: true,
  xContentTypeOptions: true,
  xDnsPrefetchControl: true,
  xDownloadOptions: true,
  xFrameOptions: true,
  xPermittedCrossDomainPolicies: true,
  xXssProtection: true
};
const secureHeaders = (customOptions) => {
  const options = { ...DEFAULT_OPTIONS, ...customOptions };
  const headersToSet = Object.entries(HEADERS_MAP).filter(([key]) => options[key]).map(([key, defaultValue]) => {
    const overrideValue = options[key];
    if (typeof overrideValue === "string")
      return [defaultValue[0], overrideValue];
    return defaultValue;
  });
  if (options.contentSecurityPolicy) {
    const cspDirectives = Object.entries(options.contentSecurityPolicy).map(([directive, value]) => {
      directive = directive.replace(
        /[A-Z]+(?![a-z])|[A-Z]/g,
        (match, offset) => (offset ? "-" : "") + match.toLowerCase()
      );
      return `${directive} ${Array.isArray(value) ? value.join(" ") : value}`;
    }).join("; ");
    headersToSet.push(["Content-Security-Policy", cspDirectives]);
  }
  if (options.reportingEndpoints) {
    const reportingEndpoints = options.reportingEndpoints.map((endpoint) => `${endpoint.name}="${endpoint.url}"`).join(", ");
    headersToSet.push(["Reporting-Endpoints", reportingEndpoints]);
  }
  if (options.reportTo) {
    const reportToOptions = options.reportTo.map((option) => JSON.stringify(option)).join(", ");
    headersToSet.push(["Report-To", reportToOptions]);
  }
  return async (ctx, next) => {
    await next();
    headersToSet.forEach(([header, value]) => {
      ctx.res.headers.set(header, value);
    });
    ctx.res.headers.delete("X-Powered-By");
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  secureHeaders
});
