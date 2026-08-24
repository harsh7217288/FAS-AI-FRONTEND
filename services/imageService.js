import { apiRequest } from "./apiClient";
export const imageService = {
  list: () => apiRequest("/diagnose"),
  create: (payload) => apiRequest("/diagnose", { method: "POST", body: JSON.stringify(payload) })
};
