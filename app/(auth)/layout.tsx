import Image from "next/image";
import React, { ReactNode } from "react";
import BackgroundImage from "@/public/login_background.jpg";
import Logo from "@/public/netflix_logo.svg";

const Authlayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
      <Image
        src={BackgroundImage}
        alt={"background image"}
        className="hidden sm:flex sm:object-cover -z-10 brightness-50"
        priority
        fill
      />

      <Image
        src={Logo}
        alt="Logo"
        className="absolute left-4 top-4 object-contain md:left-10 md:top-6"
        width={120}
        height={120}
        priority
      />
      {children}
    </div>
  );
};

export default Authlayout;
