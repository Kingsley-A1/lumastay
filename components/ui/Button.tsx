"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

type Variant = "primary" | "secondary" | "ghost" | "destructive";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  href?: string;
  loading?: boolean;
  children: React.ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-[#F9735B] text-white hover:bg-[#e85e47] active:bg-[#d54a34] shadow-sm",
  secondary:
    "border-2 border-[#0B1324] text-[#0B1324] bg-transparent hover:bg-[#0B1324] hover:text-white",
  ghost:
    "bg-transparent text-[#0B1324] hover:bg-[#F3E7D3] active:bg-[#e5d5bb]",
  destructive:
    "bg-[#DC2626] text-white hover:bg-[#b91c1c] active:bg-[#991b1b] shadow-sm",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-sm rounded-md",
  md: "px-6 py-2.5 text-base rounded-lg",
  lg: "px-8 py-3.5 text-lg rounded-xl",
};

export function Button({
  variant = "primary",
  size = "md",
  href,
  loading = false,
  disabled,
  className,
  children,
  onClick,
  type = "button",
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F9735B]",
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  const content = loading ? (
    <>
      <svg
        className="animate-spin h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        />
      </svg>
      Loading...
    </>
  ) : (
    children
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={classes}
      {...props}
    >
      {content}
    </button>
  );
}
