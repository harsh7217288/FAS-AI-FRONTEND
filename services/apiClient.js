import { API_BASE_URL } from "@/lib/constants";

export async function apiRequest(path, options = {}) {
  const token = typeof window !== "undefined" ? localStorage.getItem("fasai_token") : null;
  const headers = { "Content-Type": "application/json", ...(options.headers || {}) };
  if (token) headers.Authorization = `Bearer ${token}`;
  const response = await fetch(`${API_BASE_URL}${path}`, { ...options, headers });
  if (!response.ok) throw new Error(`API ${response.status}`);
  return response.json();
}
