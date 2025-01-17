"use client";
import { ClerkProvider, useUser } from "@clerk/nextjs";
import { Logo } from "./components/logo/Logo";
import { Navbar } from "./components/navbar/Navbar";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  const handleNavigate = () => {
    if (isSignedIn) {
      router.push("pages/dashboard");
    } else {
      router.push("/sign-in");
    }
  };

  return (
    <>
      <div className="mt-[4rem]">
        <Logo />
      </div>
      <div className="relative flex flex-col justify-center items-center mt-0 sm:mt-[5rem] md:mt-[14rem]">
        <h1 className="text-center font-medium text-[2rem] lg:text-[3rem] z-10 px-[3rem]">
          Simplify <span className="text-red-600">spending</span>, amplify
          <span className="text-amber-400"> savings</span>
        </h1>
        <p className="text-center lg:text-[2.5rem] text-[1.3rem] z-10 px-[3rem]">
          this is smart{" "}
          <span className="text-[#9D9D9D]">financial record book</span> for you
        </p>
        <button
          onClick={handleNavigate}
          className="hover:bg-[#2d4dcd] md:rounded-[30px] md:px-[15px] md:py-[10px] md:text-lg lg:text-lg mt-[3rem] bg-[#335CFF] text-white rounded-[20px] px-[10px] py-[5px] text-sm z-10"
        >
          Get Started
        </button>
      </div>
      <div>
        <div className="fixed bottom-[2rem] left-[50%] transform -translate-x-1/2 z-50">
          <Navbar />
        </div>
        <div className="absolute left-[1rem] bottom-[5rem] md:bottom-[3rem] z-0">
          <Image
            src="/images/expense-note.svg"
            alt="Note Image"
            width={320}
            height={320}
            className="w-[220px] h-[220px] lg:w-[320px] lg:h-[320px] md:w-[220px] md:h-[220px]"
          />
        </div>
      </div>
    </>
  );
}
