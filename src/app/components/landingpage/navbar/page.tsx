import React from 'react';

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className = '' }) => {
  const navItems = ['Home', 'Popular', 'Benefit', 'Contact'];

  return (
    <nav className={`w-full  bg-white shadow-sm ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-[#d9291a] to-pink-400 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <span className="text-xl font-bold text-gray-900">kITA BAYAR</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-700 hover:text-[#d9291a] px-3 py-2 text-sm font-medium transition-colors duration-200"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="bg-[#d9291a] text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-[#b8241a] transition-colors duration-200">
              Daftar
            </button>
            <button className="text-[#d9291a] border border-[#d9291a] px-6 py-2 rounded-full text-sm font-medium hover:bg-[#d9291a] hover:text-white transition-colors duration-200">
              Masuk
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-[#d9291a] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#d9291a]"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-gray-700 hover:text-[#d9291a] block px-3 py-2 text-base font-medium"
            >
              {item}
            </a>
          ))}
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex flex-col space-y-2 px-3">
              <button className="bg-[#d9291a] text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-[#b8241a] transition-colors duration-200">
                Daftar
              </button>
              <button className="text-[#d9291a] border border-[#d9291a] px-6 py-2 rounded-full text-sm font-medium hover:bg-[#d9291a] hover:text-white transition-colors duration-200">
                Masuk
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;