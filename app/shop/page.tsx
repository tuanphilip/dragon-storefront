import Link from 'next/link'
import ProductCard from '@/components/ProductCard'
import { getProducts, getCategories } from '@/lib/queries'

export default async function ShopPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-dragon-600">Trang chủ</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">Sản phẩm</span>
      </nav>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-bold text-gray-900 mb-4">Danh mục</h2>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/shop"
                  className="block text-sm text-gray-600 hover:text-dragon-600 font-medium transition-colors"
                >
                  Tất cả sản phẩm
                </Link>
              </li>
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/shop?category=${cat.slug}`}
                    className="block text-sm text-gray-600 hover:text-dragon-600 transition-colors py-1"
                  >
                    {cat.name}
                    {cat.products?.totalCount != null && (
                      <span className="text-gray-400 ml-1">({cat.products.totalCount})</span>
                    )}
                  </Link>
                  {cat.children?.map((child) => (
                    <Link
                      key={child.id}
                      href={`/shop?category=${child.slug}`}
                      className="block text-sm text-gray-400 hover:text-dragon-600 transition-colors pl-4 py-0.5"
                    >
                      {child.name}
                    </Link>
                  ))}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Sản phẩm</h1>
            <p className="text-sm text-gray-500">{products.length} sản phẩm</p>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-20">
              <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <p className="text-gray-500">Chưa có sản phẩm nào.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
