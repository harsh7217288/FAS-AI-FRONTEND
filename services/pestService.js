import { apiRequest } from "./apiClient";
export const pestService = {
  list: () => apiRequest("/pest-risk"),
  create: (payload) => apiRequest("/pest-risk", { method: "POST", body: JSON.stringify(payload) })
};
