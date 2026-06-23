import Link from 'next/link'
import { getProducts, getCategories } from '@/lib/queries'
import ProductCard from '@/components/ProductCard'
import type { Product, Category } from '@/lib/types'

export default async function HomePage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ])

  const dragonCategories = categories.filter(c => 
    c.slug === 'linh-kien-co-khi' || c.slug === 'o-bi' || c.slug === 'banh-rang' || 
    c.slug === 'puly' || c.slug === 'truc' || c.slug === 'phu-kien'
  )

  // Pick featured products (prioritize Dragon products, fallback to first 8)
  const featured = products.filter(p => 
    p.category?.slug && ['o-bi-cau','o-bi-dua','banh-rang-tru','puly-chu-v','puly-det','truc-thang','truc-bac','phu-kien'].includes(p.category.slug)
  ).slice(0, 8)
  
  const remaining = featured.length < 8 
    ? products.filter(p => !featured.find(f => f.id === p.id)).slice(0, 8 - featured.length)
    : []

  return (
    <div>
      {/* ═══════ NOTIFICATION BAR ═══════ */}
      <div className="bg-dragon-600 text-white text-sm text-center py-2 px-4">
        <span className="font-medium">🚚 Miễn phí giao hàng cho đơn trên 500,000₫ • </span>
        <Link href="/shop" className="underline hover:no-underline font-semibold">Xem ngay</Link>
      </div>

      {/* ═══════ MEGA CATEGORY NAV ═══════ */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-3">
            <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider mr-6 shrink-0">
              Danh mục sản phẩm
            </h2>
            <nav className="flex gap-1 overflow-x-auto">
              {dragonCategories.map(cat => (
                <div key={cat.id} className="group relative">
                  <Link
                    href={`/shop?category=${cat.slug}`}
                    className="px-4 py-2 text-sm text-gray-600 hover:text-dragon-600 hover:bg-dragon-50 rounded-lg transition-colors font-medium whitespace-nowrap block"
                  >
                    {cat.name}
                    {cat.products?.totalCount != null && (
                      <span className="text-gray-400 ml-1 text-xs">({cat.products.totalCount})</span>
                    )}
                  </Link>
                  {/* Dropdown subcategories */}
                  {cat.children && cat.children.length > 0 && (
                    <div className="absolute left-0 top-full mt-0 bg-white border border-gray-200 rounded-xl shadow-lg p-4 min-w-[220px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{cat.name}</p>
                      <ul className="space-y-1">
                        {cat.children.map(child => (
                          <li key={child.id}>
                            <Link
                              href={`/shop?category=${child.slug}`}
                              className="block text-sm text-gray-600 hover:text-dragon-600 hover:bg-dragon-50 px-3 py-1.5 rounded-lg transition-colors"
                            >
                              {child.name}
                              {child.products?.totalCount != null && (
                                <span className="text-gray-400 ml-1">({child.products.totalCount})</span>
                              )}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      </section>

      {/* ═══════ HERO BANNER ═══════ */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-dragon-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-dragon-400 font-semibold text-sm uppercase tracking-widest mb-3">
                Dragon Automation
              </p>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                Linh kiện cơ khí
                <br />
                <span className="text-dragon-400">chính xác cao</span>
              </h1>
              <p className="mt-4 text-lg text-gray-300 leading-relaxed max-w-lg">
                Ổ bi, bánh răng, puly, trục và phụ kiện chất lượng công nghiệp.
                Giao hàng nhanh trong 24-48h.
              </p>
              <div className="mt-8 flex gap-4">
                <Link
                  href="/shop"
                  className="inline-flex items-center px-6 py-3 rounded-xl bg-dragon-600 text-white font-semibold hover:bg-dragon-500 transition-colors shadow-lg shadow-dragon-900/30"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Tìm sản phẩm
                </Link>
                <Link
                  href="/shop"
                  className="inline-flex items-center px-6 py-3 rounded-xl border border-gray-500 text-gray-300 font-semibold hover:border-white hover:text-white transition-colors"
                >
                  Danh mục
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="hidden md:grid grid-cols-2 gap-4">
              {['Ổ bi', 'Bánh răng', 'Puly', 'Trục'].map((item, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <div className="w-12 h-12 bg-dragon-600/30 rounded-xl flex items-center justify-center text-dragon-400 mb-3">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <h3 className="text-white font-semibold">{item}</h3>
                  <p className="text-gray-400 text-sm mt-1">Chất lượng ISO</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ PROMOTIONAL BANNERS ═══════ */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: 'Miễn phí vận chuyển', desc: 'Cho đơn hàng trên 500k', icon: '🚚', color: 'bg-blue-50 border-blue-200' },
              { title: 'Hỗ trợ kỹ thuật', desc: 'Tư vấn bởi kỹ sư giàu kinh nghiệm', icon: '🔧', color: 'bg-green-50 border-green-200' },
              { title: 'CAD miễn phí', desc: 'Tải bản vẽ 2D/3D', icon: '📐', color: 'bg-purple-50 border-purple-200' },
              { title: 'Giá tốt nhất', desc: 'Cạnh tranh trên thị trường', icon: '💰', color: 'bg-amber-50 border-amber-200' },
            ].map((item, i) => (
              <div key={i} className={`${item.color} border rounded-xl p-4 text-center hover:shadow-md transition-shadow`}>
                <span className="text-2xl">{item.icon}</span>
                <h3 className="font-semibold text-gray-900 text-sm mt-2">{item.title}</h3>
                <p className="text-gray-500 text-xs mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CATEGORY GRID ═══════ */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Tìm theo danh mục</h2>
              <p className="text-gray-500 mt-1">Linh kiện cơ khí chính xác cho ngành tự động hóa</p>
            </div>
            <Link href="/shop" className="text-sm text-dragon-600 hover:text-dragon-700 font-medium hidden sm:block">
              Xem tất cả →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {dragonCategories.map(cat => (
              <Link
                key={cat.id}
                href={`/shop?category=${cat.slug}`}
                className="group bg-white rounded-xl border border-gray-200 p-6 text-center hover:border-dragon-300 hover:shadow-lg transition-all"
              >
                <div className="w-14 h-14 mx-auto bg-dragon-100 rounded-xl flex items-center justify-center text-dragon-600 group-hover:bg-dragon-600 group-hover:text-white transition-all mb-3">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-dragon-600 transition-colors text-sm">{cat.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{cat.products?.totalCount || 0} sản phẩm</p>
                {/* Show subcategories */}
                {cat.children && cat.children.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-gray-100">
                    <p className="text-xs text-gray-400">
                      {cat.children.slice(0, 3).map(c => c.name).join(', ')}
                    </p>
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ PROMO BANNERS GRID ═══════ */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Main promo */}
            <div className="bg-gradient-to-br from-dragon-800 to-dragon-950 rounded-2xl p-8 text-white relative overflow-hidden group cursor-pointer">
              <div className="relative z-10">
                <p className="text-dragon-300 text-sm font-semibold uppercase tracking-widest">Dragon Automation</p>
                <h3 className="text-2xl font-bold mt-2">Sản phẩm nổi bật</h3>
                <p className="text-gray-300 mt-2 text-sm max-w-xs">Linh kiện cơ khí chính xác, chất lượng ISO, giao hàng nhanh</p>
                <Link href="/shop" className="inline-flex items-center mt-4 px-5 py-2.5 bg-white text-dragon-900 font-semibold rounded-xl hover:bg-gray-100 transition-colors text-sm">
                  Xem ngay →
                </Link>
              </div>
              <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-dragon-600/20 rounded-full blur-3xl"></div>
            </div>

            {/* Secondary promo */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 text-white relative overflow-hidden group cursor-pointer">
              <div className="relative z-10">
                <p className="text-gray-400 text-sm font-semibold uppercase tracking-widest">Dịch vụ</p>
                <h3 className="text-2xl font-bold mt-2">Tư vấn kỹ thuật</h3>
                <p className="text-gray-300 mt-2 text-sm max-w-xs">Đội ngũ kỹ sư giàu kinh nghiệm hỗ trợ lựa chọn sản phẩm phù hợp</p>
                <Link href="/about" className="inline-flex items-center mt-4 px-5 py-2.5 bg-white text-gray-900 font-semibold rounded-xl hover:bg-gray-100 transition-colors text-sm">
                  Tìm hiểu →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ RECOMMENDED PRODUCTS (carousel-style) ═══════ */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-dragon-600 font-semibold text-sm uppercase tracking-widest">Gợi ý</p>
            <h2 className="text-2xl font-bold text-gray-900 mt-1">Sản phẩm nổi bật</h2>
            <p className="text-gray-500 mt-1">Linh kiện được quan tâm nhiều nhất</p>
          </div>
          <div className="overflow-x-auto -mx-4 px-4 pb-4">
            <div className="flex gap-5 min-w-max">
              {[...featured, ...remaining].slice(0, 10).map(product => (
                <Link
                  key={product.id}
                  href={`/shop/${product.slug}`}
                  className="group bg-white rounded-xl border border-gray-200 hover:border-dragon-300 hover:shadow-lg transition-all w-52 shrink-0 overflow-hidden"
                >
                  <div className="aspect-square bg-gray-50 relative overflow-hidden">
                    {product.media?.[0] ? (
                      <img
                        src={product.media[0].url}
                        alt={product.media[0].alt || product.name}
                        className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <p className="text-[11px] text-gray-400 uppercase tracking-wider mb-1">
                      {product.category?.name || 'Linh kiện'}
                    </p>
                    <h3 className="font-semibold text-gray-900 text-sm leading-tight group-hover:text-dragon-600 transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                    {product.pricing?.priceRange?.start?.net && (
                      <p className="mt-1.5 text-base font-bold text-dragon-700">
                        ${product.pricing.priceRange.start.net.amount.toFixed(2)}
                      </p>
                    )}
                    <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                      </svg>
                      <span>Có sẵn</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ FEATURED SECTIONS (like MISUMI's "Lựa chọn tối ưu" / "Sản Phẩm Giá Tốt") ═══════ */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section 1: Ổ bi */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Ổ bi chính xác</h2>
                <p className="text-gray-500 mt-1">Ổ bi cầu, ổ bi đũa chất lượng cao</p>
              </div>
              <Link href="/shop?category=o-bi" className="text-sm text-dragon-600 hover:text-dragon-700 font-medium">
                Xem tất cả →
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {products.filter(p => p.category?.slug === 'o-bi-cau' || p.category?.slug === 'o-bi-dua').slice(0, 4).map(product => (
                <Link
                  key={product.id}
                  href={`/shop/${product.slug}`}
                  className="group bg-white rounded-xl border border-gray-200 hover:border-dragon-300 hover:shadow-lg transition-all overflow-hidden"
                >
                  <div className="aspect-[4/3] bg-gray-50 relative overflow-hidden">
                    {product.media?.[0] ? (
                      <img src={product.media[0].url} alt={product.name} className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                    )}
                    <div className="absolute top-2 left-2 bg-dragon-600 text-white text-[10px] font-semibold px-2 py-0.5 rounded-md">
                      -{Math.floor(Math.random() * 20 + 5)}%
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-gray-900 text-sm group-hover:text-dragon-600 transition-colors line-clamp-2">{product.name}</h3>
                    {product.pricing?.priceRange?.start?.net ? (
                      <div className="mt-1.5">
                        <span className="text-base font-bold text-dragon-700">${product.pricing.priceRange.start.net.amount.toFixed(2)}</span>
                        <span className="text-xs text-gray-400 line-through ml-2">
                          ${(product.pricing.priceRange.start.net.amount * 1.25).toFixed(2)}
                        </span>
                      </div>
                    ) : (
                      <p className="text-xs text-gray-400 mt-1.5">Liên hệ báo giá</p>
                    )}
                    <div className="flex items-center gap-1 mt-2 text-[11px] text-gray-400">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                      </svg>
                      Cùng ngày
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Section 2: Bánh răng + Puly + Trục */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Bánh răng & Puly</h2>
                <p className="text-gray-500 mt-1">Bánh răng trụ, bánh răng nghiêng, puly chữ V</p>
              </div>
              <Link href="/shop?category=banh-rang" className="text-sm text-dragon-600 hover:text-dragon-700 font-medium">
                Xem tất cả →
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {products.filter(p => p.category?.slug === 'banh-rang-tru' || p.category?.slug === 'puly-chu-v').slice(0, 4).map(product => (
                <Link
                  key={product.id}
                  href={`/shop/${product.slug}`}
                  className="group bg-white rounded-xl border border-gray-200 hover:border-dragon-300 hover:shadow-lg transition-all overflow-hidden"
                >
                  <div className="aspect-[4/3] bg-gray-50 relative overflow-hidden">
                    {product.media?.[0] ? (
                      <img src={product.media[0].url} alt={product.name} className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-gray-900 text-sm group-hover:text-dragon-600 transition-colors line-clamp-2">{product.name}</h3>
                    {product.pricing?.priceRange?.start?.net ? (
                      <div className="mt-1.5">
                        <span className="text-base font-bold text-dragon-700">${product.pricing.priceRange.start.net.amount.toFixed(2)}</span>
                        <span className="text-xs text-gray-400 line-through ml-2">
                          ${(product.pricing.priceRange.start.net.amount * 1.3).toFixed(2)}
                        </span>
                      </div>
                    ) : (
                      <p className="text-xs text-gray-400 mt-1.5">Liên hệ báo giá</p>
                    )}
                    <div className="flex items-center gap-1 mt-2 text-[11px] text-gray-400">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                      </svg>
                      Có sẵn
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ CATALOG / INFRA SECTION ═══════ */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-dragon-100 rounded-xl flex items-center justify-center text-dragon-600 mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900">Catalog sản phẩm</h3>
              <p className="text-sm text-gray-500 mt-2">Tải catalog PDF linh kiện cơ khí Dragon Automation</p>
              <Link href="/shop" className="inline-flex items-center text-sm text-dragon-600 hover:text-dragon-700 font-medium mt-3">
                Tải ngay →
              </Link>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-dragon-100 rounded-xl flex items-center justify-center text-dragon-600 mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900">Văn phòng & Kho</h3>
              <p className="text-sm text-gray-500 mt-2">Khu công nghiệp, Việt Nam. Giao hàng toàn quốc</p>
              <Link href="/about" className="inline-flex items-center text-sm text-dragon-600 hover:text-dragon-700 font-medium mt-3">
                Xem bản đồ →
              </Link>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-dragon-100 rounded-xl flex items-center justify-center text-dragon-600 mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900">Hỗ trợ kỹ thuật</h3>
              <p className="text-sm text-gray-500 mt-2">Liên hệ đội ngũ kỹ sư để được tư vấn</p>
              <Link href="/about" className="inline-flex items-center text-sm text-dragon-600 hover:text-dragon-700 font-medium mt-3">
                Liên hệ →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ FEATURES (like MISUMI's branded categories) ═══════ */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Tại sao chọn Dragon Automation?</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { title: 'Chất lượng ISO', desc: 'Sản phẩm đạt tiêu chuẩn quốc tế', icon: '🏆' },
              { title: 'Giao hàng nhanh', desc: 'Trong 24-48h trên toàn quốc', icon: '⚡' },
              { title: 'Giá tốt nhất', desc: 'Cạnh tranh trực tiếp từ nhà sản xuất', icon: '💎' },
              { title: 'Hỗ trợ 24/7', desc: 'Tư vấn kỹ thuật miễn phí', icon: '🎯' },
            ].map((item, i) => (
              <div key={i} className="text-center p-6 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                <span className="text-4xl">{item.icon}</span>
                <h3 className="font-semibold text-gray-900 mt-3">{item.title}</h3>
                <p className="text-sm text-gray-500 mt-2">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
