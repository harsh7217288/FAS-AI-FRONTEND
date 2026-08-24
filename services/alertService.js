import { apiRequest } from "./apiClient";
export const alertService = {
  list: () => apiRequest("/alerts"),
  create: (payload) => apiRequest("/alerts", { method: "POST", body: JSON.stringify(payload) })
};
