import { apiClient } from "@/lib/apiClient";
import { GeneralObject } from "@/types";

export function createSignup(data: GeneralObject) {
  return apiClient.post("/signup", data);
}
