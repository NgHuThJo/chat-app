import { apiClient } from "@/lib/apiClient";
import { GenericObject } from "@/types";

export function createSignup(data: GenericObject) {
  return apiClient.post("/signup", data);
}
