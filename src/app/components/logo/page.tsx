"use client";

import React from "react";

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "w-8 h-8 bg-gradient-to-br from-[#d9291a] to-pink-400 rounded-lg flex items-center justify-center" }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg
        className="w-5 h-5 text-red"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
      </svg>
      <span className="font-bold text-lg text-[#d9291a]">kITA BAYAR</span>
    </div>
  );
};

export default Logo;
