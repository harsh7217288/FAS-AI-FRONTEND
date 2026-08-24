import { apiRequest } from "./apiClient";
export const soilService = {
  list: () => apiRequest("/soil"),
  create: (payload) => apiRequest("/soil", { method: "POST", body: JSON.stringify(payload) })
};
