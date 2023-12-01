import { html } from "hono/html";

export const Template = html`
  <!doctype html>
  <html>
    <body>
      <input type="text" id="text_input" /><br />
      <button id="send_button">Send</button> <br />
      <div id="output_div"></div>
      <script type="text/javascript">
        let currentWebSocket = null;
        const hostname = window.location.host;
        const protocol = window.location.protocol;
        const wsProtocol = protocol === "https:" ? "wss:" : "ws:";

        const outputDiv = document.getElementById("output_div");
        const sendButton = document.getElementById("send_button");
        const textInput = document.getElementById("text_input");

        async function getMessages() {
          const res = await fetch(
            protocol + "//" + hostname + "/chat/messages",
          );
          const messages = await res.json();
          return messages;
        }

        function insertMessage(message) {
          const span = document.createElement("span");
          span.innerText = message.timestamp + ": ";
          const p = document.createElement("p");
          p.innerText = message.text;
          p.prepend(span);
          outputDiv.appendChild(p);
        }

        window.onload = async () => {
          const messages = await getMessages();
          messages.forEach(insertMessage);
        };

        function join() {
          const ws = new WebSocket(
            wsProtocol + "//" + hostname + "/chat/websocket",
          );
          let rejoined = false;
          const startTime = Date.now();

          ws.addEventListener("open", (event) => {
            currentWebSocket = ws;
          });

          ws.addEventListener("message", (event) => {
            insertMessage(JSON.parse(event.data));
          });

          ws.addEventListener("close", (event) => {
            console.log(
              "WebSocket closed, reconnecting:",
              event.code,
              event.reason,
            );
            rejoin();
          });

          ws.addEventListener("error", (event) => {
            console.log("WebSocket  error, reconnecting:", event);
            rejoin();
          });

          const rejoin = async () => {
            if (!rejoined) {
              rejoined = true;
              currentWebSocket = null;

              let timeSinceLastJoin = Date.now() - startTime;
              if (timeSinceLastJoin < 5000) {
                await new Promise((resolve) =>
                  setTimeout(resolve, 5000 - timeSinceLastJoin),
                );
              }

              join();
            }
          };
        }

        sendButton.addEventListener("click", (event) => {
          const text = textInput.value;
          const now = new Date().toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          });
          const message = { text, timestamp: now };
          insertMessage(message);
          currentWebSocket.send(JSON.stringify(message));
          textInput.value = "";
        });

        join();
      </script>
    </body>
  </html>
`;
