import Link from 'next/link'
import { getProduct } from '@/lib/queries'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import AddToCartButton from './AddToCartButton'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProduct(params.slug)
  if (!product) return { title: 'Sản phẩm không tồn tại' }
  return {
    title: product.seoTitle || `${product.name} - Dragon Automation`,
    description: product.seoDescription || product.name,
  }
}

export default async function ProductPage({ params }: Props) {
  const product = await getProduct(params.slug)
  if (!product) notFound()

  const price = product.variants?.[0]?.channelListings?.[0]?.price
  const images = product.media || []

  // Parse description from EditorJS JSON
  let descriptionHtml = ''
  try {
    const desc = JSON.parse(product.description || '{}')
    if (desc.blocks) {
      descriptionHtml = desc.blocks
        .map((b: any) => {
          if (b.type === 'header') return `<h${b.data.level} class="font-bold text-lg mt-4 mb-2">${b.data.text}</h${b.data.level}>`
          if (b.type === 'paragraph') return `<p class="text-gray-600 mb-2">${b.data.text}</p>`
          if (b.type === 'list') {
            const items = b.data.items.map((i: string) => `<li>${i}</li>`).join('')
            return `<${b.data.style === 'ordered' ? 'ol' : 'ul'} class="list-disc pl-5 mb-2 space-y-1">${items}</${b.data.style === 'ordered' ? 'ol' : 'ul'}>`
          }
          return ''
        })
        .join('')
    }
  } catch {}

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-dragon-600">Trang chủ</Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-dragon-600">Sản phẩm</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Images */}
        <div>
          <div className="aspect-square bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden">
            {images[0] ? (
              <img
                src={images[0].url}
                alt={images[0].alt || product.name}
                className="w-full h-full object-contain p-8"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-300">
                <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
            )}
          </div>
          {images.length > 1 && (
            <div className="flex gap-3 mt-4">
              {images.slice(0, 4).map((img, i) => (
                <button
                  key={img.id}
                  className="w-20 h-20 rounded-lg border border-gray-200 overflow-hidden bg-gray-50 hover:border-dragon-400 transition-colors"
                >
                  <img src={img.url} alt="" className="w-full h-full object-contain p-2" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <p className="text-sm text-dragon-600 font-medium uppercase tracking-wider mb-2">
            {product.category?.name || 'Linh kiện'}
          </p>
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

          {product.variants[0]?.sku && (
            <p className="text-sm text-gray-500 mt-1">SKU: {product.variants[0].sku}</p>
          )}

          {/* Price */}
          <div className="mt-6">
            {price ? (
              <div>
                <span className="text-4xl font-bold text-dragon-700">
                  ${price.amount.toFixed(2)}
                </span>
                <span className="text-gray-500 ml-2">USD</span>
              </div>
            ) : (
              <span className="text-gray-400">Liên hệ báo giá</span>
            )}
          </div>

          {/* Attributes */}
          {product.attributes.length > 0 && (
            <div className="mt-8 border-t border-gray-200 pt-6">
              <h2 className="font-semibold text-gray-900 mb-3">Thông số kỹ thuật</h2>
              <div className="grid grid-cols-2 gap-3">
                {product.attributes.map((attr) => (
                  <div key={attr.attribute.id} className="bg-gray-50 rounded-lg px-4 py-3">
                    <p className="text-xs text-gray-500 uppercase">{attr.attribute.name}</p>
                    <p className="font-medium text-gray-900">
                      {attr.values?.[0]?.name || '-'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Add to Cart */}
          <div className="mt-8 flex gap-3">
            <AddToCartButton product={product} price={price?.amount || 0} />
          </div>
        </div>
      </div>

      {/* Description */}
      {descriptionHtml && (
        <div className="mt-16 border-t border-gray-200 pt-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Mô tả sản phẩm</h2>
          <div className="prose prose-gray max-w-none" dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
        </div>
      )}
    </div>
  )
}
