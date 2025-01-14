"use client";
import { ClerkProvider, useUser } from "@clerk/nextjs";
import Logo from "./components/logo/page";
import Navbar from "./components/navbar/page";
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
      <ClerkProvider>
        <div className="mt-[4rem]">
          <Logo />
        </div>
        <div className="relative h-screen flex flex-col justify-center items-center mt-[-6.6rem]">
          <h1 className="text-center font-medium text-[2rem] lg:text-[3rem] md:text-[2.5rem] sm:text-[1.5rem] z-10 px-[3rem]">
            Simplify <span className="text-red-600">spending</span>, amplify
            <span className="text-amber-400"> savings</span>
          </h1>
          <p className="text-center text-[1rem] lg:text-[2rem] md:text-[1.5rem] sm:text-[1rem] z-10 px-[3rem]">
            this is smart{" "}
            <span className="text-[#9D9D9D]">financial record book</span> for
            you
          </p>
          <button
            onClick={handleNavigate}
            className="hover:bg-[#2d4dcd] md:rounded-[30px] md:px-[15px] md:py-[10px] md:text-lg lg:text-lg mt-[1rem] bg-[#335CFF] text-white rounded-[20px] px-[10px] py-[5px] text-sm z-10"
          >
            Get Started
          </button>
          <div className="absolute bottom-[2rem] z-20">
            <Navbar />
          </div>
          <div className="absolute left-[1rem] bottom-[1rem] z-0">
            <Image
              src="/images/expense-note.svg"
              alt="Note Image"
              width={320}
              height={320}
              className="w-[220px] h-[220px] lg:w-[320px] lg:h-[320px] md:w-[220px] md:h-[220px]"
            />
          </div>
        </div>
      </ClerkProvider>
    </>
  );
}
