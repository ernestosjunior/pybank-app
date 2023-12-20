import axios from "axios";
import { getSession } from "next-auth/react";

export const AUTH_COOKIE_KEY = "pybank.auth.token";

export const fetcher = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function getAPIClient() {
  const session: any = await getSession();
  fetcher.interceptors.request.use((config) => {
    return config;
  });

  if (session) {
    fetcher.defaults.headers[
      "Authorization"
    ] = `Bearer ${session.access_token}`;
  }

  return fetcher;
}
