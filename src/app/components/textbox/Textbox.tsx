import { useRef } from "react";

interface TextboxProps {
  placeholder?: string;
  name: string;
  register: any;
  requiredMessage?: string;
  type?: string;
  step?: number;
}

export function Textbox({
  placeholder,
  name,
  register,
  requiredMessage,
  type,
  step,
}: TextboxProps) {
  return (
    <input
      {...register(name, { required: requiredMessage })}
      placeholder={placeholder}
      type={type}
      step={step}
      className="rounded-[10px] p-[1rem] w-[10rem] h-[2rem] text-gray-800 bg-white border-[1px] border-black-200 focus:ring-2 hover:border-blue-400 mt-[2rem]"
    />
  );
}
