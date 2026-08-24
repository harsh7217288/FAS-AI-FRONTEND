import { apiRequest } from "./apiClient";
export const fieldService = {
  list: () => apiRequest("/fields"),
  create: (payload) => apiRequest("/fields", { method: "POST", body: JSON.stringify(payload) })
};
