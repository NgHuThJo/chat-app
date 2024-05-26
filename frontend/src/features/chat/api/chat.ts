import { apiClient } from "@/lib/apiClient";
import { GeneralObject } from "@/types";

export function getChatRooms(userId: string) {
  return apiClient.get(`/chat/${userId}`);
}

export function createChatRoom(data: GeneralObject) {
  return apiClient.post("/chat/room", data);
}
