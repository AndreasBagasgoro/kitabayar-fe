"use client";

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/context/AuthContext'
import ProtectedRoute from '@/app/components/protected_route/page'
import { useCart } from '@/app/components/context/page'
import OrderCart from '@/app/components/order_card/page'
import axios from 'axios'

declare global {
  interface Window {
    snap: any
  }
}

const CheckoutPage = () => {
  const router = useRouter()
  const { isAuthenticated, token, user } = useAuth()
  const { cartItems, getTotalCartPrice, formatRupiah } = useCart()
  const [showModal, setShowModal] = useState(false)
  const adminFee = 2500
  const totalWithAdmin = getTotalCartPrice() + adminFee

  useEffect(() => {
    const checkAuth = async () => {
      console.log('Checkout page auth check:', { isAuthenticated, token, user })
      if (!isAuthenticated || !token) {
        console.log('Not authenticated, redirecting to login')
        router.replace('/auth/login')
      }
    }
    checkAuth()
  }, [router, isAuthenticated, token, user])

  // Load Midtrans script
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://app.sandbox.midtrans.com/snap/snap.js'
    script.setAttribute('data-client-key', 'SB-Mid-client-TStFVfFHdB_COqUj')
    script.async = true
    document.body.appendChild(script)
  }, [])

  const handleConfirm = async () => {
    try {
      const payload = {
        user_uuid: user?.id || "cb412473-53fb-4360-add2-28a1ac00f585",
        restaurant_id: 1,
        total_amount: totalWithAdmin,
        delivery_address: {
          street: "Jalan Mawar",
          city: "Bandung",
          postal_code: "40123"
        },
        items: cartItems.map((item) => {
          const priceNum = parseInt(item.price.replace(/\./g, ''), 10)
          return {
            menu_item_id: item.id,
            menu_item_snapshot: {
              name: item.name,
              price: priceNum,
            },
            quantity: item.quantity,
            total_price: priceNum * item.quantity,
          }
        })
      }

      const res = await axios.post('http://localhost:8000/orders/orders', payload)
      const redirectUrl = res.data?.payment?.redirect_url

      if (window.snap && res.data.payment?.snap_token) {
        window.snap.pay(res.data.payment.snap_token, {
          onSuccess: function(result: any) {
            alert("Pembayaran berhasil!")
            console.log(result)
            router.push('/dashboard/success')
          },
          onPending: function(result: any) {
            alert("Menunggu pembayaran...")
            console.log(result)
          },
          onError: function(result: any) {
            alert("Pembayaran gagal!")
            console.error(result)
          },
          onClose: function() {
            alert("Anda menutup popup tanpa menyelesaikan pembayaran")
          }
        })
      } else if (redirectUrl) {
        window.location.href = redirectUrl
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Gagal memproses pembayaran:", error.response?.data)
      } else {
        console.error("Gagal memproses pembayaran:", error)
      }
    } finally {
      setShowModal(false)
    }
  }

  return (
    <ProtectedRoute>
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
    </ProtectedRoute>
  )
}

export default CheckoutPage