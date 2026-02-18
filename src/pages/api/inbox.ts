import type { APIRoute } from "astro";
import slugify from "@sindresorhus/slugify";
import { prismaClient } from "../../prisma/prismaClient";

export const POST: APIRoute = async ({ locals, request }) => {
  const { user } = locals;
  if (!user) return new Response(null, { status: 401 });

  const body = await request.json();
  const urlName = slugify(body["name"]);
  const inbox = await prismaClient.inbox.create({
    data: {
      userId: user.id,
      lockedUntil: body["lockedUntil"],
      urlName,
      name: body["name"],
    },
  });

  return new Response(inbox.publicId.toString(), { status: 200 });
};
