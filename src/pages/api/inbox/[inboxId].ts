import type { APIRoute } from "astro";
import { prismaClient } from "../../../prisma/prismaClient";

export const GET: APIRoute = async ({ locals, params }) => {
  const { user } = locals;
  if (!user) return new Response(null, { status: 401 });

  const { inboxId } = params;
  if (!inboxId) return new Response(null, { status: 400 });

  const inbox = await prismaClient.inbox.findFirst({
    where: { OR: [{ publicId: inboxId }, { urlName: inboxId }] },
  });
  if (!inbox) return new Response(null, { status: 404 });

  return new Response(JSON.stringify(inbox), { status: 200 });
};
