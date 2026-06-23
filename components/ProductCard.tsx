import Link from 'next/link'
import type { Product } from '@/lib/types'

export default function ProductCard({ product }: { product: Product }) {
  const price = product.pricing?.priceRange?.start?.net
  const image = product.media?.[0]

  return (
    <Link href={`/shop/${product.slug}`} className="group">
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-dragon-300 transition-all duration-300">
        <div className="aspect-square bg-gray-50 relative overflow-hidden">
          {image ? (
            <img
              src={image.url}
              alt={image.alt || product.name}
              className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300">
              <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
          )}
        </div>

        <div className="p-4">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
            {product.category?.name || 'Linh kiện'}
          </p>
          <h3 className="font-semibold text-gray-900 group-hover:text-dragon-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
          {price && (
            <p className="mt-2 text-lg font-bold text-dragon-700">
              ${price.amount.toFixed(2)}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}
