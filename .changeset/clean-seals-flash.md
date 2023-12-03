---
"hono-do": minor
---

feat: enable to get bindings env from vars

```ts
import { generateHonoObject } from "hono-do";

type Env = {
    Bindings: {
        KV: KVNamespace
    };
}

export const Batcher = generateHonoObject<Env>("/", async (app, state, vars) => {
  vars.env.KV // KVNamespace
})
```
