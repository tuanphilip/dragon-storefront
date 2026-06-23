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

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const cart = JSON.parse(localStorage.getItem('dragon-cart') || '[]')
    setItems(cart)
  }, [])

  const updateQty = (slug: string, delta: number) => {
    const newItems = items
      .map((item) => item.slug === slug ? { ...item, qty: Math.max(1, item.qty + delta) } : item)
      .filter((item) => item.qty > 0)
    setItems(newItems)
    localStorage.setItem('dragon-cart', JSON.stringify(newItems))
  }

  const removeItem = (slug: string) => {
    const newItems = items.filter((item) => item.slug !== slug)
    setItems(newItems)
    localStorage.setItem('dragon-cart', JSON.stringify(newItems))
  }

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0)

  if (!mounted) return null

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Giỏ hàng</h1>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <svg className="w-20 h-20 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
          </svg>
          <p className="text-gray-500 text-lg mb-4">Giỏ hàng trống</p>
          <Link href="/shop" className="inline-flex items-center px-6 py-3 rounded-xl bg-dragon-600 text-white font-semibold hover:bg-dragon-500 transition-colors">
            Xem sản phẩm
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.slug} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4">
              <div className="w-20 h-20 bg-gray-50 rounded-lg overflow-hidden shrink-0">
                {item.image ? (
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain p-2" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <Link href={`/shop/${item.slug}`} className="font-semibold text-gray-900 hover:text-dragon-600 transition-colors">
                  {item.name}
                </Link>
                <p className="text-sm text-gray-500">SKU: {item.sku}</p>
                <p className="text-sm font-medium text-dragon-700">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQty(item.slug, -1)}
                  className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  -
                </button>
                <span className="w-8 text-center font-medium">{item.qty}</span>
                <button
                  onClick={() => updateQty(item.slug, 1)}
                  className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  +
                </button>
              </div>
              <div className="text-right w-24">
                <p className="font-bold text-gray-900">${(item.price * item.qty).toFixed(2)}</p>
              </div>
              <button
                onClick={() => removeItem(item.slug)}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))}

          <div className="bg-white rounded-xl border border-gray-200 p-6 mt-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold text-gray-900">Tổng cộng</span>
              <span className="text-2xl font-bold text-dragon-700">${total.toFixed(2)}</span>
            </div>
            <Link
              href="/checkout"
              className="block w-full text-center px-6 py-3 rounded-xl bg-dragon-600 text-white font-semibold hover:bg-dragon-500 transition-colors"
            >
              Tiến hành thanh toán
            </Link>
            <Link href="/shop" className="block w-full text-center mt-2 text-sm text-gray-500 hover:text-dragon-600">
              Tiếp tục mua hàng
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
