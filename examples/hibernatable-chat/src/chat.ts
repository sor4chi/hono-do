import { generateHonoObject } from "hono-do";

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

declare module "hono-do" {
  interface HonoObjectVars {
    messages: {
      timestamp: string;
      text: string;
    }[];
  }
}

export const Chat = generateHonoObject("/chat", (app, state, vars) => {
  vars.messages = [];

  app.get("/messages", async (c) => c.json(vars.messages));

  app.get("/websocket", async (c) => {
    if (c.req.header("Upgrade") === "websocket") {
      return await handleWebSocketUpgrade();
    }
    return c.text("Not found", 404);
  });

  async function handleWebSocketUpgrade() {
    const [client, server] = Object.values(new WebSocketPair());
    const clientId = uuidv4();
    state.acceptWebSocket(server);

    server.serializeAttachment({ clientId });

    return new Response(null, { status: 101, webSocket: client });
  }
});

Chat.webSocketMessage(async (webSocket, msg, state, vars) => {
  const { clientId: senderClientId } = await webSocket.deserializeAttachment();
  state.getWebSockets().forEach((ws) => {
    const { clientId } = ws.deserializeAttachment();
    if (clientId === senderClientId) {
      return;
    }

    try {
      vars.messages.push(JSON.parse(msg.toString()));
      ws.send(msg.toString());
    } catch (error) {
      ws.close();
    }
  });
});
