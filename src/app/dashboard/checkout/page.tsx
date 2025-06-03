"use client";

import OrderCart from '@/app/components/order_card/page';
import React, { useState } from 'react';
import { useCart } from '@/app/components/context/page'; // Sesuaikan path import sesuai struktur proyek Anda

const CheckoutPage: React.FC = () => {
  const { getTotalCartPrice, formatRupiah } = useCart();
  const adminFee: number = 2500;
  const totalWithAdmin: number = getTotalCartPrice() + adminFee;

  // Tambahkan state untuk modal
  const [showModal, setShowModal] = useState(false);

  // Handler untuk konfirmasi pembayaran
  const handleConfirm = () => {
    setShowModal(false);
    // Tambahkan aksi setelah konfirmasi jika diperlukan
    // Misal: alert('Pembayaran dikonfirmasi!');
  };

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
            <button
              className="w-full mt-6 bg-[#d9291a] text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
              onClick={() => setShowModal(true)}
            >
              Bayar Sekarang
            </button>
          </div>
        </div>
      </div>

      {/* Modal Konfirmasi Pembayaran */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/10">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Konfirmasi Pembayaran</h3>
            <p className="mb-6 text-gray-700">
              Total pembayaran: <span className="font-semibold text-[#d9291a]">Rp {formatRupiah(totalWithAdmin)}</span>
            </p>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
                onClick={() => setShowModal(false)}
              >
                Batal
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-[#d9291a] text-white hover:bg-red-700 transition"
                onClick={handleConfirm}
              >
                Konfirmasi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;