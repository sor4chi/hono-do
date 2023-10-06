---
"hono-do": patch
---

Fixed an issue where the `BasePath` type in `generateHonoObject` did not inherit the basePath of the first argument.

```ts
// Before
generateHonoObject('/foo', (app) => {
  app.get('/bar', (c) => {
    c // $ExpectType Context<Env, "/bar", {}>
  })
})

// After
generateHonoObject('/foo', (app) => {
  app.get('/bar', (c) => {
    c // $ExpectType Context<Env, "/foo/bar", {}>
  })
})
```
