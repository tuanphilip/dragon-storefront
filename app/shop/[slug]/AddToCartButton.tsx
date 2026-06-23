'use client'

import { useState } from 'react'
import type { Product } from '@/lib/types'

export default function AddToCartButton({ product, price }: { product: Product; price: number }) {
  const [added, setAdded] = useState(false)

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('dragon-cart') || '[]')
    const existing = cart.find((item: any) => item.slug === product.slug)
    if (existing) {
      existing.qty += 1
    } else {
      cart.push({
        id: product.id,
        slug: product.slug,
        name: product.name,
        price,
        image: product.media?.[0]?.url || '',
        sku: product.variants[0]?.sku || '',
        qty: 1,
      })
    }
    localStorage.setItem('dragon-cart', JSON.stringify(cart))
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const buyNow = () => {
    addToCart()
    window.location.href = '/checkout'
  }

  return (
    <>
      <button
        onClick={addToCart}
        className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all ${
          added
            ? 'bg-green-100 text-green-700 border border-green-300'
            : 'bg-dragon-600 text-white hover:bg-dragon-500'
        }`}
      >
        {added ? '✓ Đã thêm vào giỏ' : 'Thêm vào giỏ hàng'}
      </button>
      <button
        onClick={buyNow}
        className="px-6 py-3 rounded-xl border-2 border-dragon-600 text-dragon-600 font-semibold hover:bg-dragon-50 transition-colors"
      >
        Mua ngay
      </button>
    </>
  )
}
