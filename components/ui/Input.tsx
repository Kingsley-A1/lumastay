import { cn } from "@/lib/utils";
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export function Input({
  label,
  error,
  helperText,
  className,
  id,
  ...props
}: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-[#0B1324]"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          "w-full px-4 py-2.5 rounded-lg border text-[#0B1324] bg-white placeholder-[#64748B] transition-colors duration-200",
          "focus:outline-none focus:ring-2 focus:ring-[#F9735B] focus:border-transparent",
          error
            ? "border-[#DC2626] focus:ring-[#DC2626]"
            : "border-[#E5E7EB] hover:border-[#64748B]",
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-[#DC2626] mt-0.5">{error}</p>}
      {helperText && !error && (
        <p className="text-xs text-[#64748B] mt-0.5">{helperText}</p>
      )}
    </div>
  );
}
