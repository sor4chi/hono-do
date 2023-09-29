---
"hono-do": minor
---

Implement storage type-safe state helper as sub package

You can use `state.storage` type-safely like hooks in React.

```ts
import { defineStorage } from "hono-do/state";

export const Counter = generateHonoObject(
  "/counter",
  async (app, { storage }) => {
    const [getValue, setValue, delValue] = await defineStorage(storage, "value", 0);

    await getValue() // 0
    await setValue(1)
    await getValue() // 1

    await setValue((value) => value + 1) // 2
    await getValue() // 2

    await delValue()
    await getValue() // 0
  },
);
```
