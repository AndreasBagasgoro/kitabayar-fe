'use client';

// import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { Menu, ShoppingCart, User, LogOut } from 'lucide-react';
import SidebarItem from './sidebar_item/pages';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
}

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems: MenuItem[] = [
    {
      id: 'menu',
      label: 'Menu',
      icon: <Menu size={20} />,
      href: '/dashboard/menu'
    },
    {
      id: 'checkout',
      label: 'Checkout',
      icon: <ShoppingCart size={20} />,
      href: '/dashboard/checkout'
    }
  ];

  const handleItemClick = (href: string) => {
    router.push(href);
  };

  const isActiveItem = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <div className="w-64 h-screen bg-white shadow-lg flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-100">
        <div 
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => router.push('/')}
        >
          <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center">
            <div className="w-6 h-6 bg-white rounded-full opacity-80"></div>
          </div>
          <h1 className="text-xl font-bold text-gray-800">kITA BAYAR</h1>
        </div>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 pt-6">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.id}
            id={item.id}
            label={item.label}
            icon={item.icon}
            isActive={isActiveItem(item.href)}
            onClick={() => handleItemClick(item.href)}
          />
        ))}
      </div>

      {/* Bottom Section */}
      <div className="p-4 border-t border-gray-100 space-y-2">
        <div 
          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-200"
          onClick={() => router.push('/profile')}
        >
          <User size={20} className="text-gray-600" />
          <span className="text-gray-700 font-medium">Profile</span>
        </div>
        
        <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-red-50 hover:text-red-600 cursor-pointer transition-colors duration-200">
          <LogOut size={20} className="text-gray-600 hover:text-red-600" />
          <span className="text-gray-700 font-medium hover:text-red-600">Keluar</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;