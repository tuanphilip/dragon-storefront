'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface CartItem {
  id: string
  slug: string
  name: string
  price: number
  image: string
  sku: string
  qty: number
}

export default function CheckoutPage() {
  const [items, setItems] = useState<CartItem[]>([])
  const [mounted, setMounted] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    note: '',
  })

  useEffect(() => {
    setMounted(true)
    const cart = JSON.parse(localStorage.getItem('dragon-cart') || '[]')
    setItems(cart)
  }, [])

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In production, this would create a Saleor checkout
    // For now, just show confirmation
    setSubmitted(true)
    localStorage.removeItem('dragon-cart')
  }

  if (!mounted) return null

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Đặt hàng thành công!</h1>
        <p className="text-gray-600 mb-8">Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ liên hệ xác nhận trong thời gian sớm nhất.</p>
        <Link href="/shop" className="inline-flex items-center px-6 py-3 rounded-xl bg-dragon-600 text-white font-semibold hover:bg-dragon-500 transition-colors">
          Tiếp tục mua hàng
        </Link>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-500 text-lg mb-4">Giỏ hàng trống</p>
        <Link href="/shop" className="inline-flex items-center px-6 py-3 rounded-xl bg-dragon-600 text-white font-semibold hover:bg-dragon-500 transition-colors">
          Xem sản phẩm
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Thanh toán</h1>

      <div className="grid md:grid-cols-5 gap-8">
        {/* Form */}
        <div className="md:col-span-3">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên *</label>
              <input
                required
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-dragon-500 focus:ring-1 focus:ring-dragon-500 outline-none"
                placeholder="Nguyễn Văn A"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-dragon-500 focus:ring-1 focus:ring-dragon-500 outline-none"
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại *</label>
                <input
                  required
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-dragon-500 focus:ring-1 focus:ring-dragon-500 outline-none"
                  placeholder="0123 456 789"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ giao hàng *</label>
              <input
                required
                type="text"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-dragon-500 focus:ring-1 focus:ring-dragon-500 outline-none"
                placeholder="Số nhà, đường, phường, quận, thành phố"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ghi chú</label>
              <textarea
                value={form.note}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-dragon-500 focus:ring-1 focus:ring-dragon-500 outline-none"
                rows={3}
                placeholder="Yêu cầu thêm (nếu có)"
              />
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 rounded-xl bg-dragon-600 text-white font-semibold hover:bg-dragon-500 transition-colors"
            >
              Xác nhận đặt hàng
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="md:col-span-2">
          <div className="bg-gray-50 rounded-xl p-6 sticky top-6">
            <h2 className="font-semibold text-gray-900 mb-4">Đơn hàng</h2>
            <div className="space-y-3 mb-4">
              {items.map((item) => (
                <div key={item.slug} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 truncate mr-2">
                    {item.name} <span className="text-gray-400">x{item.qty}</span>
                  </span>
                  <span className="font-medium text-gray-900">${(item.price * item.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 pt-3 flex items-center justify-between">
              <span className="font-semibold text-gray-900">Tổng cộng</span>
              <span className="text-xl font-bold text-dragon-700">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
