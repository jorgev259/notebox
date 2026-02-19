// @ts-check
import { defineConfig, envField } from "astro/config";

import react from "@astrojs/react";

import tailwindcss from "@tailwindcss/vite";

import node from "@astrojs/node";

// https://astro.build/confi
export default defineConfig({
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
  env: {
    schema: {
      DATABASE_URL: envField.string({ access: "secret", context: "server" }),
      BETTER_AUTH_URL: envField.string({ access: "public", context: "client" }),
      DISCORD_CLIENT_ID: envField.string({
        access: "secret",
        context: "server",
      }),
      DISCORD_CLIENT_SECRET: envField.string({
        access: "secret",
        context: "server",
      }),
      DATABASE_HOST: envField.string({ access: "secret", context: "server" }),
      DATABASE_USER: envField.string({ access: "secret", context: "server" }),
      DATABASE_PASSWORD: envField.string({
        access: "secret",
        context: "server",
      }),
      DATABASE_NAME: envField.string({ access: "secret", context: "server" }),
      DATABASE_PORT: envField.number({ access: "secret", context: "server" }),
    },
  },
  adapter: node({
    mode: "standalone",
  }),
  output: "server",
});
