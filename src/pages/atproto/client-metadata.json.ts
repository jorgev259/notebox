import type { APIRoute } from "astro";

const metadata = {
  client_id: "https://your-app.com/client-metadata.json",
  application_type: "web",
  client_name: "your-app-name",
  redirect_uris: ["https://your-app.com/api/auth/bluesky/callback"],
  grant_types: ["authorization_code", "refresh_token"],
  response_types: ["code"],
  scope: "atproto transition:generic",
  dpop_bound_access_tokens: true,
  token_endpoint_auth_method: "private_key_jwt",
  jwks_uri: "https://your-app.com/jwks.json",
  token_endpoint_auth_signing_alg: "ES256",
};

export const GET: APIRoute = () => {
  return new Response(JSON.stringify(metadata), {
    headers: { "Content-Type": "application/json" },
  });
};
