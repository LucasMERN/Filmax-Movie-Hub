"use server";

import prisma from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function syncUserDBs() {
  try {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) return;

    const existingUser = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (existingUser) return existingUser;

    const dbUser = await prisma.user.create({
      data: {
        clerkId: userId,
      },
    });

    return dbUser;
  } catch (error) {
    console.error("Error syncing user:", error);
  }
}

export const getUserID = async () => {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) return;

  const existingUser = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  if (existingUser) return existingUser.id;
};

export const getWatchlist = async (id?: string) => {
  const records = await prisma.watchlist.findMany({
    where: { userId: id },
    select: {
      id: true,
      link: true,
      title: true,
      poster_image: true,
    },
    distinct: ["id"],
    orderBy: {
      createdAt: "desc",
    },
  });

  return records;
};
