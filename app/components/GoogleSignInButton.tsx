"use client";
import { Button } from "@/components/ui/button";
import { GithubIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import React from "react";
import GoogleIcon from "@/public/google.svg";

const GoogleSignInButton = () => {
  return (
    <>
      <Button
        onClick={() => signIn("google")}
        variant={"outline"}
        size={"icon"}
      >
        <Image src={GoogleIcon} alt="Google icon" className="w-6 h-6" />
      </Button>
    </>
  );
};

export default GoogleSignInButton;
