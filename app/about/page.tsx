import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-dragon-600">Trang chủ</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">Giới thiệu</span>
      </nav>

      <h1 className="text-4xl font-bold text-gray-900 mb-6">Về Dragon Automation</h1>

      <div className="prose prose-lg max-w-none">
        <p className="text-gray-600 leading-relaxed">
          Dragon Automation được thành lập với sứ mệnh cung cấp các linh kiện cơ khí chất lượng cao 
          cho ngành công nghiệp tự động hóa tại Việt Nam và quốc tế.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Tầm nhìn</h2>
        <p className="text-gray-600">
          Trở thành nhà cung cấp linh kiện cơ khí hàng đầu, đồng hành cùng sự phát triển của ngành 
          sản xuất thông minh.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Sứ mệnh</h2>
        <ul className="space-y-2 text-gray-600">
          <li>Cung cấp sản phẩm đạt tiêu chuẩn quốc tế</li>
          <li>Tư vấn kỹ thuật chuyên sâu miễn phí</li>
          <li>Giao hàng nhanh chóng, đúng hẹn</li>
          <li>Hỗ trợ kỹ thuật trọn đời sản phẩm</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Giá trị cốt lõi</h2>
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="w-12 h-12 bg-dragon-100 rounded-lg flex items-center justify-center text-dragon-600 mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900">Chất lượng</h3>
            <p className="text-sm text-gray-500 mt-2">Mọi sản phẩm đều được kiểm định nghiêm ngặt</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="w-12 h-12 bg-dragon-100 rounded-lg flex items-center justify-center text-dragon-600 mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900">Chính xác</h3>
            <p className="text-sm text-gray-500 mt-2">Dung sai đạt tiêu chuẩn ISO</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="w-12 h-12 bg-dragon-100 rounded-lg flex items-center justify-center text-dragon-600 mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900">Tin cậy</h3>
            <p className="text-sm text-gray-500 mt-2">Đối tác của nhiều nhà máy lớn</p>
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="mt-16 bg-gradient-to-r from-dragon-600 to-dragon-700 rounded-2xl p-10 text-white text-center">
        <h2 className="text-2xl font-bold">Cần tư vấn kỹ thuật?</h2>
        <p className="mt-2 text-dragon-100">Liên hệ ngay để được hỗ trợ</p>
        <a
          href="mailto:info@dragonautomation.com"
          className="inline-flex items-center mt-6 px-8 py-3 rounded-xl bg-white text-dragon-700 font-semibold hover:bg-dragon-50 transition-colors"
        >
          info@dragonautomation.com
        </a>
      </div>
    </div>
  )
}
