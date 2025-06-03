"use client";

import React from 'react';
import { Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useCart } from '@/app/components/context/page'; // Sesuaikan path

const OrderCart: React.FC = () => {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    formatRupiah
  } = useCart();

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex justify-between items-center p-6 border-b">
        <h2 className="text-2xl font-bold text-gray-800">Food Cart</h2>
        {cartItems.length > 0 && (
          <button
            onClick={clearCart}
            className="text-gray-500 hover:text-red-500 transition-colors text-sm"
          >
            Clear Cart
          </button>
        )}
      </div>

      <div className="max-w-full mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="">
          {cartItems.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingCart size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => {
                const itemPrice: number = parseInt(item.price.replace(/\./g, ''));
                return (
                  <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    {/* Product Image */}
                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <span className="text-gray-400 text-xs">IMG</span>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{item.name}</h3>
                      <p className="text-orange-500 font-semibold">Rp {formatRupiah(itemPrice)}</p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={16} className={item.quantity <= 1 ? 'text-gray-300' : 'text-gray-600'} />
                      </button>
                      
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                      >
                        <Plus size={16} className="text-gray-600" />
                      </button>
                    </div>

                    {/* Item Total */}
                    <div className="text-right">
                      <p className="font-bold text-gray-800">Rp {formatRupiah(itemPrice * item.quantity)}</p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 transition-colors mt-1"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderCart;