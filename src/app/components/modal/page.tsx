import React, { ReactNode } from "react";

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
}

export default function Modal({ children, isOpen }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-auto max-w-[20rem] lg:w-auto lg:max-w-none relative">
        <div>{children}</div>
      </div>
    </div>
  );
}
