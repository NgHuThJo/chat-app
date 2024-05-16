import { apiClient } from "@/lib/apiClient";

export function getUserList() {
  return apiClient.get("/user");
}
