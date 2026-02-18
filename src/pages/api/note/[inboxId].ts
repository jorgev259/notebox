import type { APIRoute } from "astro";
import { prismaClient } from "../../../prisma/prismaClient";

export const POST: APIRoute = async ({ locals, request, params }) => {
  const { user } = locals;
  if (!user) return new Response(null, { status: 401 });

  const { inboxId } = params;
  if (!inboxId) return new Response(null, { status: 400 });

  const inbox = await prismaClient.inbox.findFirst({
    where: {
      AND: [
        { OR: [{ publicId: inboxId }, { urlName: inboxId }] },
        { locked: false },
      ],
    },
  });
  if (!inbox) return new Response(null, { status: 404 });

  const body = await request.json();
  const note = await prismaClient.note.create({
    data: {
      inboxId: inbox.id,
      content: body["content"],
      signature: body["signature"],
    },
  });

  return new Response(note.publicId.toString(), { status: 200 });
};
