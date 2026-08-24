import { apiRequest } from "./apiClient";
export const weatherService = {
  list: () => apiRequest("/weather"),
  create: (payload) => apiRequest("/weather", { method: "POST", body: JSON.stringify(payload) })
};
