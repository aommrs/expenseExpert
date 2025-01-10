"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
export default function Logo() {
  const router = useRouter();
  return (
    <>
      <Image
        className="hover:cursor-pointer"
        src="/images/expense-logo.svg"
        alt="Logo Image"
        width={120}
        height={120}
        onClick={() => router.push("/")}
      />
    </>
  );
}
