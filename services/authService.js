import { apiRequest } from "./apiClient";
export const authService = {
  register: (payload) => apiRequest("/auth/register", { method: "POST", body: JSON.stringify(payload) }),
  login: (payload) => apiRequest("/auth/login", { method: "POST", body: new URLSearchParams(payload), headers: { "Content-Type": "application/x-www-form-urlencoded" } })
};
