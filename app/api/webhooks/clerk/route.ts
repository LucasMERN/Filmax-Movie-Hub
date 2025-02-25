import { Webhook, WebhookRequiredHeaders } from "svix";
import { headers } from "next/headers";
import { IncomingHttpHeaders } from "http";

import prisma from "@/lib/prisma";

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET || "";

async function handler(request: Request) {
  const payload = await request.json();
  const headersList = headers();
  const heads = {
    "svix-id": headersList.get("svix-id"),
    "svix-timestamp": headersList.get("svix-timestamp"),
    "svix-signature": headersList.get("svix-signature"),
  };
  const wh = new Webhook(webhookSecret);
  let evt: Event | null = null;

  try {
    evt = wh.verify(
      JSON.stringify(payload),
      heads as IncomingHttpHeaders & WebhookRequiredHeaders,
    ) as Event;
  } catch (err) {
    console.error(
      "Error verifying webhook:",
      err,
      JSON.stringify(heads, null, 2),
    );
    return new Response("Error verifying webhook", {
      status: 400,
    });
  }

  const eventType: EventType = evt.type;

  if (eventType === "user.created") {
    const { id, ...attributes } = evt.data;

    try {
      await prisma.user.create({
        data: {
          clerkId: id as string,
        },
      });
      console.log("User created in DB:", id);
    } catch (error) {
      console.error("Error creating user in DB:", error);
      return new Response("Error creating user in DB", {
        status: 500,
      });
    }
  }

  if (eventType === "user.updated") {
    return;
  }

  if (eventType === "user.deleted") {
    const { id } = evt.data;
    try {
      await prisma.user.delete({
        where: { clerkId: id as string },
      });
      console.log("User deleted in DB:", id);
    } catch (error) {
      console.error("Error deleting user in DB:", error);
      return new Response("Error deleting user in DB", {
        status: 500,
      });
    }
  }

  return new Response("", { status: 200 });
}

export const GET = handler;
export const POST = handler;

type EventType = "user.created" | "user.updated" | "user.deleted";

type Event = {
  data: Record<string, string | number>;
  object: "event";
  type: EventType;
};
