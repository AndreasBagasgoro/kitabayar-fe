"use client";

import OrderCart from '@/app/components/order_card/page';
import React from 'react';
import { useCart } from '@/app/components/context/page'; // Sesuaikan path import sesuai struktur proyek Anda

const CheckoutPage: React.FC = () => {
  const { getTotalCartPrice, formatRupiah } = useCart();
  const adminFee: number = 2500;
  const totalWithAdmin: number = getTotalCartPrice() + adminFee;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Checkout</h1>
        <p className="text-gray-600">Selesaikan pembayaran Anda dengan aman.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <OrderCart />
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Ringkasan</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Jumlah Transfer</span>
                <span className="font-medium">Rp {formatRupiah(getTotalCartPrice())}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Biaya Admin</span>
                <span className="font-medium">Rp {formatRupiah(adminFee)}</span>
              </div>
              <hr />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>Rp {formatRupiah(totalWithAdmin)}</span>
              </div>
            </div>
            <button className="w-full mt-6 bg-[#d9291a] text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors">
              Bayar Sekarang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;