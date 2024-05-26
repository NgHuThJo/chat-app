import { WebSocket, WebSocketServer } from "ws";

const webSocketPort = process.env.WEBSOCKET_PORT || 8080;

// WebSocket setup
const wss = new WebSocketServer({ port: webSocketPort });
const onlineUsers = new Map();
const rooms = new Set();

function getKey<K, V>(map: Map<K, V>, mapValue: V) {
  for (let [key, value] of map.entries()) {
    if (value === mapValue) {
      return key;
    }
  }
}

wss.on("connection", (ws) => {
  console.log("connected");

  ws.on("message", (payload: string) => {
    const data = JSON.parse(payload);
    console.log("received: ", data);

    switch (data.type) {
      case "addUser": {
        onlineUsers.set(data.id, ws);

        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(
              JSON.stringify({
                type: "getUsers",
                data: {
                  users: [...onlineUsers.keys()],
                },
              })
            );
          }
        });

        break;
      }
      case "sendMessage": {
        const { senderId, receiverId, message } = data;
        const sendUserSocket = onlineUsers.get(receiverId);

        if (sendUserSocket) {
          sendUserSocket.send(
            JSON.stringify({
              type: "sendMessage",
              data: {
                senderId,
                message,
              },
            })
          );
        }

        break;
      }
      default: {
        throw Error("Unknown type: ".concat(data.type));
      }
    }
  });

  ws.on("close", () => {
    onlineUsers.delete(getKey(onlineUsers, ws));

    const data = JSON.stringify({
      type: "getUsers",
      data: {
        users: [...onlineUsers.keys()],
      },
    });

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });

    console.log("disconnected");
  });

  ws.on("error", console.error);
});
