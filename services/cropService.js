import { apiRequest } from "./apiClient";
export const cropService = {
  list: () => apiRequest("/crop-health"),
  create: (payload) => apiRequest("/crop-health", { method: "POST", body: JSON.stringify(payload) })
};
