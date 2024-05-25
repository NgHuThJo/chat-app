import { apiClient } from "@/lib/apiClient";

export function getUsers() {
  return apiClient.get("/user");
}
