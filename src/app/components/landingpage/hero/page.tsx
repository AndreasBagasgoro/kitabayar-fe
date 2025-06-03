import React from "react";
import Link from "next/link";
import Image from "next/image";

interface HeroProps {
  className?: string;
}

const Hero: React.FC<HeroProps> = ({ className = "" }) => {
  return (
    <section
      className={`relative w-full min-h-screen flex shadow-lg items-center justify-center overflow-hidden ${className} ring-10 ring-white`}>
       <div className="absolute inset-0">
          <Image
            src="/hero/foodorder.svg?height=700&width=1400"
            alt="Healthcare background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            <span className="block">Delicious Food,</span>
            <span className="block">Delivered Fresh</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-200 mb-8 leading-relaxed max-w-3xl mx-auto">
            Experience the finest cuisine with our carefully crafted dishes made
            from the freshest ingredients.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/order"
              className="bg-[#d9291a] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#b8241a] transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl min-w-[160px]"
            >
              Order Now
            </Link>

            <Link
              href="/about"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl min-w-[160px]"
            >
              Learn More
            </Link>
          </div>

          {/* Additional Info (Optional) */}
        </div>
      </div>
    </section>
  );
};

export default Hero;
