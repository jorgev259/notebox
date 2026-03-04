import {
  MemoryStore,
  OAuthClient,
  scope,
  type ClientAssertionPrivateJwk,
  type StoredState,
} from "@atcute/oauth-node-client";
import {
  CompositeDidDocumentResolver,
  CompositeHandleResolver,
  LocalActorResolver,
  PlcDidDocumentResolver,
  WebDidDocumentResolver,
  WellKnownHandleResolver,
} from "@atcute/identity-resolver";
import { NodeDnsHandleResolver } from "@atcute/identity-resolver-node";
import path from "path";
import fs from "fs";
import { getFullUrl } from "./url";

const dataFile = path.join(process.cwd(), "jwk.json");
export const fullKeySet = JSON.parse(
  fs.readFileSync(dataFile, { encoding: "utf-8" }),
);
export const callbackUrl = getFullUrl("/atproto/callback");

/* export const atprotoClient = new OAuthClient({
  metadata: {
    client_id: getFullUrl("/atproto/client-metadata.json"),
    redirect_uris: [callbackUrl],
    scope: [
      scope.account({ attr: "email", action: "read" }),
      scope.identity({ attr: "handle" }),
    ],
    jwks_uri: getFullUrl("/atproto/jwks.json"),
  },

  // JWKs can be used directly - no import step needed
  keyset: [fullKeySet as ClientAssertionPrivateJwk],

  stores: {
    // sessions are keyed by DID - should be durable across restarts.
    // states are keyed by OAuth state value - should have ~10 minute TTL.
    // MemoryStore works for development; use Redis or similar in production.
    sessions: new MemoryStore(),
    states: new MemoryStore(),
  },
  // optional: custom lock for coordinating token refresh across processes.
  // defaults to in-memory, which works for single-process deployments.
  // for multi-process/clustered deployments, provide a distributed lock
  // (e.g., Redis-based) to prevent concurrent refresh for the same session.
  // async requestLock(name, fn) {
  // ...
  // },

  actorResolver: new LocalActorResolver({
    handleResolver: new CompositeHandleResolver({
      methods: {
        dns: new NodeDnsHandleResolver(),
        http: new WellKnownHandleResolver(),
      },
    }),
    didDocumentResolver: new CompositeDidDocumentResolver({
      methods: {
        plc: new PlcDidDocumentResolver(),
        web: new WebDidDocumentResolver(),
      },
    }),
  }),
});
 */

export const atprotoClient = new OAuthClient({
  metadata: {
    // no client_id needed - built automatically as:
    // http://localhost?redirect_uri=http://127.0.0.1:8080/callback&scope=...
    redirect_uris: [callbackUrl],
    scope: [scope.rpc({ lxm: ["app.bsky.actor.getProfile"], aud: "*" })],
  },
  // no keyset - this makes it a public client

  stores: {
    sessions: new MemoryStore(),
    states: new MemoryStore<string, StoredState>({
      maxSize: 10,
      ttl: 10 * 60_000,
    }),
  },

  actorResolver: new LocalActorResolver({
    handleResolver: new CompositeHandleResolver({
      methods: {
        dns: new NodeDnsHandleResolver(),
        http: new WellKnownHandleResolver(),
      },
    }),
    didDocumentResolver: new CompositeDidDocumentResolver({
      methods: {
        plc: new PlcDidDocumentResolver(),
        web: new WebDidDocumentResolver(),
      },
    }),
  }),
});
