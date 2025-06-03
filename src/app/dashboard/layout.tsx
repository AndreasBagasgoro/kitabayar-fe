import React from 'react';


import '../globals.css';
import Sidebar from '../components/dashboard/sidebar/page';

import { CartProvider } from '../components/context/page';

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="">
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar */}
          <Sidebar />
          
          {/* Main Content */}
          <main className="flex-1 overflow-y-auto">
            <CartProvider>
              {children}
            </CartProvider>
          </main>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;