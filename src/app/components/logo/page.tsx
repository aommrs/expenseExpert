import Image from "next/image";
export default function Logo() {
  return (
    <>
      <Image
        src="/images/expense-logo.svg"
        alt="Logo Image"
        width={120}
        height={120}
      />
    </>
  );
}
