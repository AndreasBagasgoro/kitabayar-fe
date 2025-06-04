"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Interface untuk MenuItem
interface MenuItem {
  id: number;
  name: string;
  price: string;
  image: string | null;
  category?: string;
  description?: string;
}

// Interface untuk Cart Item
export interface CartItem extends MenuItem {
  quantity: number;
}

// Interface untuk Cart Context
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  clearCart: () => void;
  getTotalCartItems: () => number;
  getTotalCartPrice: () => number;
  formatRupiah: (amount: number) => string;
}

// Create context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider component
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Add to cart function
  const addToCart = (item: MenuItem): void => {
    setCartItems((prevCart: CartItem[]) => {
      const existingItem = prevCart.find((cartItem: CartItem) => cartItem.id === item.id);
      
      if (existingItem) {
        return prevCart.map((cartItem: CartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  // Remove from cart
  const removeFromCart = (id: number): void => {
    setCartItems((items: CartItem[]) => items.filter((item: CartItem) => item.id !== id));
  };

  // Increase quantity
  const increaseQuantity = (id: number): void => {
    setCartItems((items: CartItem[]) =>
      items.map((item: CartItem) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrease quantity
  const decreaseQuantity = (id: number): void => {
    setCartItems((items: CartItem[]) =>
      items.map((item: CartItem) =>
        item.id === id && item.quantity > 1 
          ? { ...item, quantity: item.quantity - 1 } 
          : item
      )
    );
  };

  // Clear cart
  const clearCart = (): void => {
    setCartItems([]);
  };

  // Get total items
  const getTotalCartItems = (): number => {
    return cartItems.reduce((total: number, item: CartItem) => total + item.quantity, 0);
  };

  // Get total price
  const getTotalCartPrice = (): number => {
    return cartItems.reduce((total: number, item: CartItem) => {
      const price: number = parseInt(item.price.replace(/\./g, ''));
      return total + (price * item.quantity);
    }, 0);
  };

  // Format rupiah
  const formatRupiah = (amount: number): string => {
    return new Intl.NumberFormat('id-ID').format(amount);
  };

  const value: CartContextType = {
    cartItems,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    getTotalCartItems,
    getTotalCartPrice,
    formatRupiah
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};