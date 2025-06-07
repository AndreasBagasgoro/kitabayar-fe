"use client"

import React, { useState, useEffect } from 'react';
import SearchField from '@/app/components/ui/search/page';
import MenuCard from '@/app/components/menu_card/page';
import { useCart } from '@/app/components/context/page';
import { getMenuItemsByRestaurant } from '../../../../services/api/menuItems';
import { getRestaurants } from '../../../../services/api/restaurant';
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/context/AuthContext';
import ProtectedRoute from '@/app/components/protected_route/page';

interface MenuItem {
  id: number;
  name: string;
  price: string;
  image: string | null;
  category?: string;
  description?: string;
}

interface CartItem extends MenuItem {
  quantity: number;
}

const MenuPage: React.FC = () => {
  const router = useRouter();
  const { isAuthenticated, token, user } = useAuth();
  const { cartItems, addToCart, getTotalCartItems, getTotalCartPrice, formatRupiah } = useCart();
  
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [showCartNotification, setShowCartNotification] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      console.log('Menu page auth check:', { isAuthenticated, token, user });
      if (!isAuthenticated || !token) {
        console.log('Not authenticated, redirecting to login');
        router.replace('/auth/login');
      }
    };
    checkAuth();
  }, [router, isAuthenticated, token, user]);

  useEffect(() => {
    const loadMenuData = async () => {
      try {
        setLoading(true);
        const response = await getMenuItemsByRestaurant('1');
        setMenuItems(response);
        setFilteredItems(response);
      } catch (error) {
        console.error('Gagal memuat menu:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMenuData();
  }, []);

  useEffect(() => {
    let filtered = menuItems;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredItems(filtered);
  }, [searchQuery, selectedCategory, menuItems]);

  useEffect(() => {
    if (showCartNotification) {
      const timer = setTimeout(() => {
        setShowCartNotification(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showCartNotification]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleAddToCart = (item: MenuItem) => {
    addToCart(item);
    setShowCartNotification(true);
    console.log('Item added to cart:', item);
  };

  const categories = [
    { id: 'all', name: 'Semua Menu' },
    { id: 'traditional', name: 'Tradisional' },
    { id: 'grilled', name: 'Bakar/Panggang' },
    { id: 'fried', name: 'Goreng' },
    { id: 'soup', name: 'Kuah/Sup' },
    { id: 'salad', name: 'Salad' }
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <section>
          <h1 className="text-2xl font-bold text-gray-800">Our Menu</h1>
          <h3 className="text-gray-600">Discover our delicious selection of carefully crafted dishes</h3>
        </section>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d9291a]"></div>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="space-y-6">
        {/* Cart Notification */}
        {showCartNotification && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in-right">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Item berhasil ditambahkan ke keranjang!</span>
            </div>
          </div>
        )}

        {/* Header Section */}
        <section>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Our Menu</h1>
              <h3 className="text-gray-600">Discover our delicious selection of carefully crafted dishes</h3>
            </div>
            
            {/* Cart Summary */}
            {cartItems.length > 0 && (
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#d9291a] rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{getTotalCartItems()} items</p>
                    <p className="text-sm text-gray-600">Rp {formatRupiah(getTotalCartPrice())}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Search Section */}
        <section>
          <SearchField onSearch={handleSearch} placeholder="Cari menu favorit Anda..." />
        </section>

        {/* Category Filter */}
        <section>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-[#d9291a] text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section>
          <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
            <p className="text-gray-600">
              Menampilkan <span className="font-semibold">{filteredItems.length}</span> dari{' '}
              <span className="font-semibold">{menuItems.length}</span> menu
            </p>
            {searchQuery && (
              <p className="text-sm text-gray-500">
                Hasil pencarian untuk: &quot;<span className="font-medium">{searchQuery}</span>&quot;
              </p>
            )}
          </div>
        </section>

        {/* Menu Grid */}
        <section>
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredItems.map((item) => (
                <MenuCard
                  key={item.id}
                  item={item}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Menu tidak ditemukan</h3>
              <p className="text-gray-500 mb-4">
                Coba ubah kata kunci pencarian atau pilih kategori yang berbeda
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="bg-[#d9291a] text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Reset Filter
              </button>
            </div>
          )}
        </section>

        {/* Floating Cart Button */}
        {cartItems.length > 0 && (
          <div className="fixed bottom-6 right-6 z-40">
            <button 
              className="bg-[#d9291a] hover:bg-red-700 text-white p-4 rounded-full shadow-lg transition-all duration-200 hover:scale-105"
              onClick={() => router.push('/dashboard/checkout')}
            >
              <div className="relative">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                </svg>
                {getTotalCartItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-white text-[#d9291a] text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {getTotalCartItems()}
                  </span>
                )}
              </div>
            </button>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
};
  
export default MenuPage;