"use client";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
export function Logo() {
  const router = useRouter();
  return (
    <>
      <div className="flex justify-between items-center px-[2rem] md:px-[4rem]">
        <Image
          className="hover:cursor-pointer"
          src="/images/expense-logo.svg"
          alt="Logo Image"
          width={120}
          height={120}
          onClick={() => router.push("/")}
        />
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </>
  );
}
