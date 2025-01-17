import { ReactNode } from "react";

interface CategoryCardProps {
  children: ReactNode;
}

export function CategoryCard({ children }: CategoryCardProps) {
  return (
    <div className="flex justify-center gap-2 bg-[#EBEBEB] rounded-[20px] w-[10rem] md:w-[10rem] lg:w-[12rem] h-auto p-[1rem]">
      {children}
    </div>
  );
}
