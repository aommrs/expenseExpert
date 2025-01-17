"use client";
import { ReactNode, useState, useCallback, useRef, useEffect } from "react";

interface ActionButtonProps {
  children: (toggleVisibility: () => void, isVisible: boolean) => ReactNode;
  bgPosition?: string;
}

export function ActionButton({
  children,
  bgPosition = "left-0",
}: ActionButtonProps) {
  const [isVisible, setIsVisible] = useState(false);
  const actionRef = useRef<HTMLDivElement>(null);

  const toggleVisibility = useCallback(() => {
    setIsVisible((prev) => !prev);
  }, []);

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
        className="flex justify-center items-center bg-[#F2F2F2] hover:bg-[#a9a9a9] w-[1.6rem] h-[1rem] rounded-[18px] cursor-pointer"
        onClick={toggleVisibility}
      >
        <p className="text-[0.8rem] mt-[-0.2rem]">...</p>
      </div>

      {isVisible && (
        <div
          className={`absolute top-[1.5rem] rounded-[12px] overflow-hidden ${bgPosition} lg:left-0 bg-white w-auto h-auto z-50`}
        >
          {children(toggleVisibility, isVisible)}
        </div>
      )}
    </div>
  );
}
