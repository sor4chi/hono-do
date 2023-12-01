export const Template = /*html*/ `
<html>
  <body>
    <h1>Counter</h1>
    <p>Current value: <span id="value"></span></p>
    <button id="increment">Increment</button>
    <button id="decrement">Decrement</button>
    <script>
      const value = document.getElementById("value");
      const increment = document.getElementById("increment");
      const decrement = document.getElementById("decrement");
      const updateValue = async () => {
        const res = await fetch("/counter");
        value.innerText = await res.text();
      }
      increment.addEventListener("click", async () => {
        await fetch("/counter/increment", { method: "POST" });
        await updateValue();
      })
      decrement.addEventListener("click", async () => {
        await fetch("/counter/decrement", { method: "POST" });
        await updateValue();
      })
      updateValue();
    </script>
  </body>
</html>
`.trim();
