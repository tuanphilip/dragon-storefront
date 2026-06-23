import Link from 'next/link'
import { getProducts, getCategories } from '@/lib/queries'
import ProductCard from '@/components/ProductCard'

export default async function HomePage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ])

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-dragon-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">
              Linh kiện cơ khí
              <span className="text-dragon-400"> chính xác</span>
            </h1>
            <p className="mt-6 text-lg text-gray-300 leading-relaxed">
              Dragon Automation cung cấp ổ bi, bánh răng, puly, trục và phụ kiện 
              chất lượng cao cho ngành công nghiệp tự động hóa.
            </p>
            <div className="mt-10 flex gap-4">
              <Link
                href="/shop"
                className="inline-flex items-center px-6 py-3 rounded-xl bg-dragon-600 text-white font-semibold hover:bg-dragon-500 transition-colors"
              >
                Xem sản phẩm
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center px-6 py-3 rounded-xl border border-gray-500 text-gray-300 font-semibold hover:border-white hover:text-white transition-colors"
              >
                Giới thiệu
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center">Danh mục sản phẩm</h2>
          <p className="mt-2 text-gray-500 text-center">Đa dạng chủng loại, đáp ứng mọi nhu cầu</p>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/shop?category=${cat.slug}`}
                className="group bg-white rounded-xl border border-gray-200 p-6 text-center hover:border-dragon-300 hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 mx-auto bg-dragon-100 rounded-lg flex items-center justify-center text-dragon-600 group-hover:bg-dragon-600 group-hover:text-white transition-all mb-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-dragon-600 transition-colors">{cat.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{cat.products?.totalCount || 0} sản phẩm</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Sản phẩm nổi bật</h2>
              <p className="text-gray-500 mt-1">Linh kiện cơ khí chất lượng cao</p>
            </div>
            <Link href="/shop" className="text-dragon-600 hover:text-dragon-700 font-medium">
              Xem tất cả →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.slice(0, 8).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Chất lượng ISO', desc: 'Sản phẩm đạt tiêu chuẩn quốc tế, kiểm định nghiêm ngặt' },
              { title: 'Giao hàng nhanh', desc: 'Kho hàng sẵn có, giao trong 24-48 giờ' },
              { title: 'Tư vấn kỹ thuật', desc: 'Đội ngũ kỹ sư giàu kinh nghiệm hỗ trợ trọn đời' },
            ].map((f, i) => (
              <div key={i} className="text-center p-6">
                <div className="w-16 h-16 mx-auto bg-dragon-100 rounded-2xl flex items-center justify-center text-dragon-600 mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={i === 0 ? "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" : i === 1 ? "M13 10V3L4 14h7v7l9-11h-7z" : "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z"} />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900">{f.title}</h3>
                <p className="text-gray-500 text-sm mt-2">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
