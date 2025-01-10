import { DropDown } from "@/app/interfaces/page";
import React, { useState, useRef, useEffect } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

interface DropdownProps {
  data: DropDown[];
  dataSelected: DropDown;
  onSelect: (item: DropDown) => void;
}

export default function Dropdown({
  data,
  dataSelected,
  onSelect,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (item: DropDown) => {
    onSelect(item);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-[0.4rem] bg-[#EDEDED] border-[1px] border-black-200 hover:bg-[#cecece] rounded-[10px] h-[2.2rem] w-auto px-[0.8rem] text-left"
      >
        {dataSelected.text}
        <RiArrowDropDownLine className="text-2xl" />
      </button>

      {isOpen && (
        <ul className="absolute bg-white border-gray-300 rounded-lg w-full mt-1 shadow-lg z-10 overflow-hidden">
          {data.map((item, index) => (
            <li
              key={index}
              className="py-[0.5rem] px-[1rem] cursor-pointer hover:bg-gray-200 w-full"
              onClick={() => handleSelect(item)}
            >
              {item.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
