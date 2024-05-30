"use server";
import { revalidatePath } from "next/cache";
import prisma from "./utils/db";
import { getServerSession } from "next-auth";
import { authOptions } from "./utils/auth";

export const addToWatchList = async (formData: FormData) => {
  const movieId = formData.get("movieId");
  const pathName = formData.get("pathname") as string;

  const session = await getServerSession(authOptions);
  const data = await prisma.watchList.create({
    data: {
      userId: session?.user?.email as string,
      movieId: Number(movieId),
    },
  });
  revalidatePath(pathName);
};

export const removeFromWatchList = async (formData: FormData) => {
  const watchListId = formData.get("watchListId") as string;
  const pathName = formData.get("pathname") as string;
  const data = await prisma.watchList.delete({
    where: {
      id: watchListId,
    },
  });
  revalidatePath(pathName);
};
