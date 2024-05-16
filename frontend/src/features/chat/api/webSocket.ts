export function createSocket() {
  const socket = new WebSocket(import.meta.env.VITE_WEBSOCKET_URL);

  return socket;
}
