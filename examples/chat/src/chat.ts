import { generateHonoObject } from "hono-do";

import { uuidv4 } from "./utils";

type Message = {
  timestamp: string;
  text: string;
};

export const Chat = generateHonoObject("/chat", (app) => {
  const messages: Message[] = [];
  const sessions = new Map<string, WebSocket>();

  app.get("/messages", async (c) => c.json(messages));

  app.ws("/websocket", (h) => {
    const newClientId = uuidv4();

    sessions.set(newClientId, h.session);

    h.onMessage((msg) => {
      messages.push(JSON.parse(msg));

      for (const [clientId, webSocket] of sessions.entries()) {
        if (clientId === newClientId) continue;

        try {
          webSocket.send(msg);
        } catch (error) {
          sessions.delete(clientId);
        }
      }
    });
  });
});
