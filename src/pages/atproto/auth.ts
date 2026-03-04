import { atprotoClient, callbackUrl } from "@/utils/atproto";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ cookies, request, redirect }) => {
  const url = new URL(request.url);
  const searchParams = url.searchParams;

  const identifier = searchParams.get("identifier");

  if (!identifier)
    return new Response(null, {
      status: 400,
      statusText: "Missing identifier parameter",
    });

  const authUrl = await atprotoClient.authorize({
    target: { type: "account", identifier },
    redirectUri: callbackUrl,
  });

  return redirect(authUrl.url.toString());
};
