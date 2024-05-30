import MovieCard from "@/app/components/MovieCard";
import { authOptions } from "@/app/utils/auth";
import prisma from "@/app/utils/db";
import { getServerSession } from "next-auth";
import Image from "next/image";
import React from "react";

const getData = async (category: string, userId: string) => {
  switch (category) {
    case "shows":
      category = "show";
      break;
    case "movies":
      category = "movie";
      break;
    case "recently":
      category = "recent";
      break;
    default:
      break;
  }
  try {
    const data = await prisma.movie.findMany({
      where: {
        category: category,
      },
      select: {
        age: true,
        duration: true,
        id: true,
        title: true,
        release: true,
        imageString: true,
        overview: true,
        youtubeString: true,
        WatchLists: {
          where: {
            userId: userId,
          },
        },
      },
    });
    return data;
  } catch (error) {
    throw new Error();
  }
};

const CategoryPage = async ({ params }: { params: { genre: string } }) => {
  const session = await getServerSession(authOptions);
  const data = await getData(params.genre, session?.user?.email as string);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-5 sm:px-0 mt-10 gap-6">
      {data.map((movie) => (
        <div className="relative h-60" key={movie.id}>
          <Image
            src={movie.imageString}
            alt="Movie"
            width={500}
            height={400}
            className=" rounded-sm absolute w-full h-full object-cover"
          />
          <div className="h-60 relative z-10 w-full transform transition duration-500 hover:scale-125 opacity-0 hover:opacity-100 ">
            <div className="bg-gradient-to-b from-transparent via-black/50 to-black z-10 w-full h-full rounded-lg flex items-center justify-center">
              <Image
                src={movie.imageString}
                alt="Movie"
                width={800}
                height={800}
                className=" absolute h-full w-full object-cover -z-10 rounded-lg"
              />
              <MovieCard
                key={movie.id}
                age={movie.age}
                movieId={movie.id}
                overview={movie.overview}
                time={movie.duration}
                title={movie.title}
                watchListId={movie?.WatchLists[0]?.id}
                watchList={movie.WatchLists.length > 0}
                year={movie.release}
                youtubeUrl={movie.youtubeString}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryPage;
