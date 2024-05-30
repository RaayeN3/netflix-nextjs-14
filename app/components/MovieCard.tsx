"use client";
import { Button } from "@/components/ui/button";
import { Heart, PlayCircle } from "lucide-react";
import React, { useState } from "react";
import PlayVideoModel from "./PlayVideoModel";
import { addToWatchList, removeFromWatchList } from "../action";
import { usePathname } from "next/navigation";
interface iAppProps {
  title: string;
  overview: string;
  movieId: number;
  watchList: boolean;
  watchListId: string;
  youtubeUrl: string;
  year: number;
  age: number;
  time: number;
}

const MovieCard = ({
  title,
  overview,
  movieId,
  watchList,
  watchListId,
  youtubeUrl,
  age,
  time,
  year,
}: iAppProps) => {
  const [open, setOpen] = useState(false);
  const pathName = usePathname();
  return (
    <>
      <button onClick={() => setOpen(!open)} className="-mt-14">
        <PlayCircle className="h-20 w-20" />
      </button>
      <div className="right-5 top-5 absolute z-10">
        <form action={watchList ? removeFromWatchList : addToWatchList}>
          <input type="hidden" name="movieId" value={movieId} />
          <input type="hidden" name="pathname" value={pathName} />
          <input type="hidden" name="watchListId" value={watchListId} />
          <Button variant={"outline"} size={"icon"}>
            <Heart className={`w-4 h-4 ${watchList && "text-red-500"}`} />
          </Button>
        </form>
        {watchList}
      </div>
      <div className="p-5 absolute bottom-0 left-0">
        <h1 className="font-bold text-lg line-clamp-1">{title}</h1>
        <div className="flex gap-x-2 items-center">
          <p className="font-normal text-sm">{year}</p>
          <p className="font-normal border py-0.5 px-1 border-gray-200 rounded text-sm">
            {age}+
          </p>
          <p className="font-normal text-sm">{time}h</p>
        </div>
        <p className=" line-clamp-1 text-sm text-gray-200 font-light">
          {overview}
        </p>
      </div>
      <PlayVideoModel
        youtubeUrl={youtubeUrl}
        key={movieId}
        title={title}
        overview={overview}
        state={open}
        changeState={setOpen}
        age={age}
        duration={time}
        release={year}
      />
    </>
  );
};

export default MovieCard;
