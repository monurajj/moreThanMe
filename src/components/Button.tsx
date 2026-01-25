"use client";
import { ButtonHTMLAttributes } from "react";

export default function Button({ className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  // Default styles - can be overridden by className prop
  const defaultStyles = "px-5 py-2 rounded bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400";
  
  return (
    <button
      className={className || defaultStyles}
      {...props}
    />
  );
} 