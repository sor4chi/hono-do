// src/router/linear-router/router.ts
import { METHOD_NAME_ALL, UnsupportedPathError } from "../../router.js";
var splitPathRe = /\/(:\w+(?:{[^}]+})?)|\/[^\/\?]+|(\?)/g;
var splitByStarRe = /\*/;
var LinearRouter = class {
  constructor() {
    this.name = "LinearRouter";
    this.routes = [];
  }
  add(method, path, handler) {
    if (path.charCodeAt(path.length - 1) === 63) {
      this.routes.push([method, path.slice(0, -1), handler]);
      this.routes.push([method, path.replace(/\/[^/]+$/, ""), handler]);
    } else {
      this.routes.push([method, path, handler]);
    }
  }
  match(method, path) {
    const handlers = [];
    const params = {};
    ROUTES_LOOP:
      for (let i = 0; i < this.routes.length; i++) {
        const [routeMethod, routePath, handler] = this.routes[i];
        if (routeMethod !== method && routeMethod !== METHOD_NAME_ALL) {
          continue;
        }
        if (routePath === "*" || routePath === "/*") {
          handlers.push(handler);
          continue;
        }
        const hasStar = routePath.indexOf("*") !== -1;
        const hasLabel = routePath.indexOf(":") !== -1;
        if (!hasStar && !hasLabel) {
          if (routePath === path || routePath + "/" === path) {
            handlers.push(handler);
          }
        } else if (hasStar && !hasLabel) {
          const endsWithStar = routePath.charCodeAt(routePath.length - 1) === 42;
          const parts = (endsWithStar ? routePath.slice(0, -2) : routePath).split(splitByStarRe);
          const lastIndex = parts.length - 1;
          for (let j = 0, pos = 0; j < parts.length; j++) {
            const part = parts[j];
            const index = path.indexOf(part, pos);
            if (index !== pos) {
              continue ROUTES_LOOP;
            }
            pos += part.length;
            if (j === lastIndex) {
              if (!endsWithStar && pos !== path.length && !(pos === path.length - 1 && path.charCodeAt(pos) === 47)) {
                continue ROUTES_LOOP;
              }
            } else {
              const index2 = path.indexOf("/", pos);
              if (index2 === -1) {
                continue ROUTES_LOOP;
              }
              pos = index2;
            }
          }
          handlers.push(handler);
        } else if (hasLabel && !hasStar) {
          const localParams = {};
          const parts = routePath.match(splitPathRe);
          const lastIndex = parts.length - 1;
          for (let j = 0, pos = 0; j < parts.length; j++) {
            if (pos === -1 || pos >= path.length) {
              continue ROUTES_LOOP;
            }
            const part = parts[j];
            if (part.charCodeAt(1) === 58) {
              let name = part.slice(2);
              let value;
              if (name.charCodeAt(name.length - 1) === 125) {
                const openBracePos = name.indexOf("{");
                const pattern = name.slice(openBracePos + 1, -1);
                const restPath = path.slice(pos + 1);
                const match = new RegExp(pattern, "d").exec(restPath);
                if (!match || match.indices[0][0] !== 0 || match.indices[0][1] === 0) {
                  continue ROUTES_LOOP;
                }
                name = name.slice(0, openBracePos);
                value = restPath.slice(...match.indices[0]);
                pos += match.indices[0][1] + 1;
              } else {
                let endValuePos = path.indexOf("/", pos + 1);
                if (endValuePos === -1) {
                  if (pos + 1 === path.length) {
                    continue ROUTES_LOOP;
                  }
                  endValuePos = path.length;
                }
                value = path.slice(pos + 1, endValuePos);
                pos = endValuePos;
              }
              if (params[name] && params[name] !== value || localParams[name] && localParams[name] !== value) {
                throw new Error("Duplicate param name");
              }
              localParams[name] = value;
            } else {
              const index = path.indexOf(part, pos);
              if (index !== pos) {
                continue ROUTES_LOOP;
              }
              pos += part.length;
            }
            if (j === lastIndex) {
              if (pos !== path.length && !(pos === path.length - 1 && path.charCodeAt(pos) === 47)) {
                continue ROUTES_LOOP;
              }
            }
          }
          Object.assign(params, localParams);
          handlers.push(handler);
        } else if (hasLabel && hasStar) {
          throw new UnsupportedPathError();
        }
      }
    return handlers.length ? {
      handlers,
      params
    } : null;
  }
};
export {
  LinearRouter
};
