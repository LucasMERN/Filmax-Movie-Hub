"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function addToWatchlist({
  title,
  poster_image,
  link,
}: {
  title: string;
  poster_image: string;
  link: string;
}) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized"); // Or handle this more gracefully
  }

  try {
    let user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      user = await prisma.user.create({
        data: { clerkId: userId },
      });
    }

    await prisma.watchlist.create({
      data: {
        title,
        poster_image,
        link,
        userId: user.id,
      },
    });

    revalidatePath("/watchlist");
    return { success: true };
  } catch (error) {
    console.error("Failed to add to watchlist:", error);
    return { error: "Failed to add to watchlist" };
  }
}

export async function removeFromWatchlist(link: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  try {
    let user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return { error: "User not found" };
    }

    await prisma.watchlist.deleteMany({
      where: {
        userId: user.id,
        link: link,
      },
    });

    revalidatePath("/watchlist");
    return { success: true };
  } catch (error) {
    console.error("Failed to remove from watchlist:", error);
    return { error: "Failed to remove from watchlist" };
  }
}

export async function checkIfItemInWatchlist(
  userId: string,
  link: string,
): Promise<boolean> {
  try {
    if (!userId) {
      return false;
    }

    let user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return false;
    }

    const existingWatchlistItem = await prisma.watchlist.findFirst({
      where: {
        userId: user.id,
        link: link,
      },
    });
    return !!existingWatchlistItem;
  } catch (error) {
    console.error("Error checking watchlist:", error);
    return false;
  }
}
