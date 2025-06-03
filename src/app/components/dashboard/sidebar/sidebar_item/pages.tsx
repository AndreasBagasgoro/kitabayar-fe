"use client";

import React from "react";

interface SidebarItemProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  icon,
  isActive,
  onClick,
}) => {
  return (
    <div
      className={`
        mx-4 mb-2 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 ease-in-out
        flex items-center space-x-3
        ${
          isActive
            ? "bg-[#d9291a] text-white shadow-md"
            : "text-gray-700 hover:bg-[#d9291a] hover:text-white hover:shadow-md"
        }
      `}
      onClick={onClick}
    >
      <div
        className={`
        ${isActive ? "text-white" : "text-gray-600 group-hover:text-white"}
        transition-colors duration-200
      `}
      >
        {icon}
      </div>
      <span className="font-medium">{label}</span>
    </div>
  );
};

export default SidebarItem;
