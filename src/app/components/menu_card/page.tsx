"use client";

import { FC, MouseEvent } from "react";
import { ImageIcon, ShoppingCart } from "lucide-react";

// Interface langsung di file ini
interface MenuItem {
  id: number;
  name: string;
  price: string;
  image: string | null;
  category?: string;
  description?: string;
}

interface MenuCardProps {
  item: MenuItem;
  onAddToCart?: (item: MenuItem) => void;
}

const MenuCard: FC<MenuCardProps> = ({ item, onAddToCart }) => {
  // Handler untuk mencegah event bubbling ketika tombol diklik
  const handleAddToCartClick = (e: MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation(); // Mencegah onClick dari parent div
    onAddToCart?.(item);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200 h-80 w-full">
      {/* Image Container */}
      <div className="h-48 bg-gray-100 flex items-center justify-center">
        {item.image ? (
          <img
            src={item.image || "/placeholder.svg"}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <ImageIcon className="w-12 h-12 text-gray-400" />
        )}
      </div>

      {/* Content */}
      <div className="p-4 h-32 flex flex-col justify-between">
        {/* Menu Info */}
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-base leading-tight mb-2">
            {item.name}
          </h3>
          <p className="text-[#d9291a] font-bold text-lg mb-3">
            Rp {item.price}
          </p>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCartClick}
          className="w-full bg-[#d9291a] hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#d9291a] focus:ring-opacity-50"
        >
          <ShoppingCart size={16} />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default MenuCard;