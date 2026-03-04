import { atprotoClient } from "@/utils/atproto";
import type { APIRoute } from "astro";
import { Agent } from "@atproto/api";

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const { session } = await atprotoClient.callback(url.searchParams);

  return new Response(JSON.stringify({ session }), {
    headers: { "Content-Type": "application/json" },
  });
};
