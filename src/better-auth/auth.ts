import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prismaClient } from "../prisma/prismaClient";
import transport from "../utils/mailer";
import { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET } from "astro:env/server";
import { BETTER_AUTH_URL } from "astro:env/client";

export const auth = betterAuth({
  baseURL: BETTER_AUTH_URL,
  database: prismaAdapter(prismaClient, { provider: "mysql" }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      await transport.sendMail({
        to: user.email,
        subject: "Verify your email address",
        text: `Click the link to verify your email: ${url}`,
      });
    },
  },
  socialProviders: {
    discord: {
      clientId: DISCORD_CLIENT_ID as string,
      clientSecret: DISCORD_CLIENT_SECRET as string,
    },
    /*  github: {
      clientId: GITHUB_CLIENT_ID as string,
      clientSecret: GITHUB_CLIENT_SECRET as string,
    },
    google: {
      clientId: GOOGLE_CLIENT_ID as string,
      clientSecret: GOOGLE_CLIENT_SECRET as string,
    },
    microsoft: {
      clientId: MICROSOFT_CLIENT_ID as string,
      clientSecret: MICROSOFT_CLIENT_SECRET as string,
      // Optional
      tenantId: "common",
      authority: "https://login.microsoftonline.com", // Authentication authority URL
      prompt: "select_account", // Forces account selection
    }, */
    // bsky.social
  },
});
