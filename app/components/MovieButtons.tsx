"use client";
import { Button } from "@/components/ui/button";
import { InfoIcon, PlayCircle } from "lucide-react";
import React, { useState } from "react";
import PlayVideoModel from "./PlayVideoModel";

interface iAppProps {
  overview: string;
  youtubeUrl: string;
  id: number;
  age: number;
  title: string;
  releaseDate: number;
  duration: number;
}

const MovieButtons = ({
  overview,
  youtubeUrl,
  id,
  age,
  title,
  releaseDate,
  duration,
}: iAppProps) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex gap-x-3 mt-4">
      <Button onClick={() => setOpen(true)} className="text-lg font-medium">
        <PlayCircle className="mr-2 h-6 w-6" /> Play
      </Button>
      <Button
        onClick={() => setOpen(true)}
        className="text-lg font-medium bg-white/40 hover:bg-white/30 duration-500 text-white"
      >
        <InfoIcon className="mr-2 h-6 w-6" /> Learn More
      </Button>
      <PlayVideoModel
        state={open}
        changeState={() => setOpen(!open)}
        age={age}
        duration={duration}
        key={id}
        overview={overview}
        release={releaseDate}
        title={title}
        youtubeUrl={youtubeUrl}
      />
    </div>
  );
};

export default MovieButtons;
