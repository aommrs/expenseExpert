import React, { useState, useRef, useEffect } from "react";
import EmojiPicker from "emoji-picker-react";

interface EmojiProps {
  placeholder?: string;
  onChange?: (value: string) => void;
  value?: string;
}

export default function EmojiInput({
  placeholder,
  onChange,
  value: propValue,
}: EmojiProps) {
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [value, setValue] = useState(propValue || "");
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setValue(propValue || "");
  }, [propValue]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsEmojiPickerOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleEmojiSelect = (emoji: any) => {
    const newValue = value + emoji.emoji;
    setValue(newValue);
    setIsEmojiPickerOpen(false);
    if (onChange) onChange(newValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    if (onChange) onChange(newValue);
  };

  const handleFocus = () => {
    setIsEmojiPickerOpen(true);
  };

  return (
    <div className="relative">
      <input
        ref={inputRef}
        className="rounded-[10px] p-[1rem] w-[10rem] h-[2rem] text-gray-800 bg-white border-[1px] border-gray-300 focus:ring-2 hover:border-blue-400 mt-[2rem]"
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        onFocus={handleFocus}
      />
      {isEmojiPickerOpen && (
        <div
          ref={emojiPickerRef}
          className="absolute top-full mt-2 bg-white shadow-lg border rounded-lg z-10 overflow-y-auto max-h-[300px] w-[16rem] lg:w-[22rem]"
        >
          <EmojiPicker onEmojiClick={handleEmojiSelect} searchDisabled={true} />{" "}
          {/* Disable search */}
        </div>
      )}
    </div>
  );
}
