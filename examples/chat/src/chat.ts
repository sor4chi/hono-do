import { defineState, generateHonoObject } from "hono-do";

export const Chat = generateHonoObject("/chat", async (app, state) => {
  const [getMessages, setMessages] = await defineState<
    {
      timestamp: string;
      text: string;
    }[]
  >(state.storage, "messages", []);
  const [getSessions, setSessions] = await defineState(
    state.storage,
    "sessions",
    new Map<string, WebSocket>(),
  );

  app.get("/messages", async (c) => c.json(await getMessages()));

  app.get("/websocket", async (c) => {
    if (c.req.header("Upgrade") === "websocket") {
      return await handleWebSocketUpgrade();
    }
    return c.text("Not found", 404);
  });

  async function handleWebSocketUpgrade() {
    const [client, server] = Object.values(new WebSocketPair());
    const clientId = Math.random().toString(36).slice(2);
    server.accept();

    (await getSessions()).set(clientId, server);

    server.addEventListener("message", async (msg) => {
      if (typeof msg.data !== "string") return;
      const messages = await getMessages();
      setMessages([...messages, JSON.parse(msg.data)]);
      await broadcast(msg.data, clientId);
    });

    return new Response(null, { status: 101, webSocket: client });
  }

  async function broadcast(message: string, senderClientId?: string) {
    for (const [clientId, webSocket] of (await getSessions()).entries()) {
      if (clientId === senderClientId) {
        continue;
      }

      try {
        webSocket.send(message);
      } catch (error) {
        const sessions = await getSessions();
        sessions.delete(clientId);
        await setSessions(sessions);
      }
    }
  }
});
