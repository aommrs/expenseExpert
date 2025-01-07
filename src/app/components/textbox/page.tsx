import { useRef } from "react";

interface TextboxProps {
  placeholder?: string;
  name: string;
  register: any;
  requiredMessage?: string;
}

export default function Textbox({
  placeholder,
  name,
  register,
  requiredMessage,
}: TextboxProps) {
  return (
    <input
      {...register(name, { required: requiredMessage })}
      placeholder={placeholder}
      className="rounded-[10px] p-[1rem] w-[10rem] h-[2rem] text-gray-800 bg-white border-[1px] border-gray-300 focus:ring-2 hover:border-blue-400 mt-[2rem]"
    />
  );
}
