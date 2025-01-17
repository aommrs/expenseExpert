"use client";
import { RiHome2Line } from "react-icons/ri";
import { MdOutlineDashboard } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import { MdOutlineCategory } from "react-icons/md";
import { useRouter } from "next/navigation";
export function Navbar() {
  const router = useRouter();

  return (
    <>
      <div className="rounded-[30px] h-[4rem] w-[13rem] bg-[#F2F2F2] flex justify-center items-center gap-[1.5rem]">
        <RiHome2Line
          onClick={() => router.push("/")}
          className="cursor-pointer text-black hover:text-stone-400 text-2xl"
        />
        <MdOutlineDashboard
          onClick={() => router.push("/pages/dashboard")}
          className="cursor-pointer text-black hover:text-stone-400 text-2xl"
        />
        <GrTransaction
          onClick={() => router.push("/pages/transaction")}
          className="cursor-pointer text-black hover:text-stone-400 text-2xl"
        />
        <MdOutlineCategory
          onClick={() => router.push("/pages/category")}
          className="cursor-pointer text-black hover:text-stone-400 text-2xl"
        />
      </div>
    </>
  );
}
