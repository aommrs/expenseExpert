"use client";
import { ReactNode, useState, useCallback, useRef, useEffect } from "react";

interface CategoryCardProps {
  children: (toggleVisibility: () => void, isVisible: boolean) => ReactNode;
}

export default function ActionButton({ children }: CategoryCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const actionRef = useRef<HTMLDivElement>(null);

  const toggleVisibility = useCallback(() => {
    setIsVisible((prev) => !prev);
  }, []);

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        actionRef.current &&
        !actionRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={actionRef} className="flex flex-col relative">
      <div
        className="flex justify-center items-center bg-[#ffffff] hover:bg-[#a9a9a9] w-[1.6rem] h-[1rem] rounded-[18px] cursor-pointer"
        onClick={toggleVisibility}
      >
        <p className="text-[0.8rem] mt-[-0.5rem]">...</p>
      </div>

      {isVisible && (
        <div className="absolute top-[1.5rem] rounded-[12px] overflow-hidden left-0 bg-white w-auto h-auto z-50">
          {children(toggleVisibility, isVisible)}
        </div>
      )}
    </div>
  );
}
