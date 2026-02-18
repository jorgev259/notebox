import type { APIRoute } from "astro";
import { prismaClient } from "../../../prisma/prismaClient";

export const GET: APIRoute = async ({ locals, redirect }) => {
  const { user } = locals;
  if (!user) return new Response(null, { status: 401 });

  const inboxes = await prismaClient.inbox.findMany({
    where: { userId: user.id },
  });

  return new Response(JSON.stringify(inboxes), { status: 200 });
};
