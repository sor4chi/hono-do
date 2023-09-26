// src/compose.ts
import { Context } from "./context.js";
var compose = (middleware, onError, onNotFound) => {
  const middlewareLength = middleware.length;
  return (context, next) => {
    let index = -1;
    return dispatch(0);
    function dispatch(i) {
      if (i <= index) {
        throw new Error("next() called multiple times");
      }
      let handler = middleware[i];
      index = i;
      if (i === middlewareLength && next)
        handler = next;
      let res;
      let isError = false;
      if (!handler) {
        if (context instanceof Context && context.finalized === false && onNotFound) {
          res = onNotFound(context);
        }
      } else {
        try {
          res = handler(context, () => {
            const dispatchRes = dispatch(i + 1);
            return dispatchRes instanceof Promise ? dispatchRes : Promise.resolve(dispatchRes);
          });
        } catch (err) {
          if (err instanceof Error && context instanceof Context && onError) {
            context.error = err;
            res = onError(err, context);
            isError = true;
          } else {
            throw err;
          }
        }
      }
      if (!(res instanceof Promise)) {
        if (res !== void 0 && "response" in res) {
          res = res["response"];
        }
        if (res && (context.finalized === false || isError)) {
          context.res = res;
        }
        return context;
      } else {
        return res.then((res2) => {
          if (res2 !== void 0 && "response" in res2) {
            res2 = res2["response"];
          }
          if (res2 && context.finalized === false) {
            context.res = res2;
          }
          return context;
        }).catch(async (err) => {
          if (err instanceof Error && context instanceof Context && onError) {
            context.error = err;
            context.res = await onError(err, context);
            return context;
          }
          throw err;
        });
      }
    }
  };
};
export {
  compose
};
