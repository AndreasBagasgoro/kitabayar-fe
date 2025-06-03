import React from 'react';
import Link from 'next/link';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  return (
    <footer className={`bg-gray-900 text-white py-8 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Us Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              {/* Address */}
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  <svg
                    className="w-5 h-5 text-[#d9291a]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  123 Food Street, City, State 12345
                </p>
              </div>

              {/* Phone */}
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-[#d9291a]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                </div>
                <p className="text-gray-300 text-sm">
                  (555) 123-4567
                </p>
              </div>
            </div>
          </div>

          {/* Opening Hours Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Opening Hours</h3>
            <div className="space-y-2">
              {/* Monday - Friday */}
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-sm">Monday - Friday</span>
                <span className="text-white text-sm font-medium">11:00 AM - 10:00 PM</span>
              </div>

              {/* Saturday - Sunday */}
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-sm">Saturday - Sunday</span>
                <span className="text-white text-sm font-medium">10:00 AM - 11:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Border/Divider */}
        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-400 text-xs mb-4 sm:mb-0">
              © 2024 kITA BAYAR. All rights reserved.
            </p>
            
            {/* Social Links (Optional) */}
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-gray-400 hover:text-[#d9291a] transition-colors duration-200"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-[#d9291a] transition-colors duration-200"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-[#d9291a] transition-colors duration-200"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.291C3.897 14.47 3.026 12.78 3.026 10.84c0-1.588.298-2.999.894-4.233.596-1.234 1.429-2.199 2.499-2.895 1.07-.695 2.314-1.043 3.73-1.043.616 0 1.207.072 1.774.217.567.145 1.075.363 1.523.654.448.291.815.642 1.101 1.053.286.41.429.859.429 1.348 0 .489-.143.938-.429 1.348-.286.411-.653.762-1.101 1.053-.448.291-.956.509-1.523.654-.567.145-1.158.217-1.774.217-1.416 0-2.66-.348-3.73-1.043-1.07-.696-1.903-1.661-2.499-2.895-.596-1.234-.894-2.645-.894-4.233 0-1.94.871-3.63 2.1-4.857.875-.801 2.026-1.291 3.323-1.291h7.098c1.297 0 2.448.49 3.323 1.291 1.229 1.227 2.1 2.917 2.1 4.857 0 1.588-.298 2.999-.894 4.233-.596 1.234-1.429 2.199-2.499 2.895-1.07.695-2.314 1.043-3.73 1.043H8.449z"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;