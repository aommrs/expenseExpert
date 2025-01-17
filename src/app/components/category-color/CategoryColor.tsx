import React from "react";

interface CategoryColorProps {
  color: string;
}

export function CategoryColor({ color }: CategoryColorProps) {
  return <div className={`w-4 h-4 rounded-full flex-shrink-0 ${color}`}></div>;
}
