import { apiClient } from "@/lib/apiClient";
import { GenericObject } from "@/types";

export function getChatRooms(userId: string) {
  return apiClient.get(`/chat/${userId}`);
}

export function createChatRoom(data: GenericObject) {
  return apiClient.post("/chat/room", data);
}

export function getChatMessages(roomId: string) {
  return apiClient.get(`/chat/room/${roomId}`);
}

export function createChatMessage(data: GenericObject) {
  return apiClient.post("/chat/message", data);
}
