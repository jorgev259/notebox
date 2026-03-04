import type { APIRoute } from "astro";

import { fullKeySet } from "@/utils/atproto";
const { _d, ...publicKeySet } = fullKeySet;

export const GET: APIRoute = () => {
  console.log(publicKeySet);
  return new Response(JSON.stringify(publicKeySet), {
    headers: { "Content-Type": "application/json" },
  });
};
