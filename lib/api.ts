import axios from "axios";

export const AUTH_COOKIE_KEY = "pybank.auth.token";

export const fetcher = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export function getAPIClient(ctx?: any) {
  const token = "";

  fetcher.interceptors.request.use((config) => {
    return config;
  });

  if (token) {
    fetcher.defaults.headers["Authorization"] = `Bearer ${token}`;
  }

  return fetcher;
}
