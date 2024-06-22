import { check, counter } from "@/actions/postAction";

export const baseURL: string = "http://localhost:3001/";
export const fetcher = (url: string) => fetch(url).then((r) => r.json());
export const fetcherCheck = (url: string) => check(url);
export const fetcherCounter = (url: string) => counter(url);
export const swrconfig = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  refreshInterval: 15 * 60 * 1000, // 15p
};
