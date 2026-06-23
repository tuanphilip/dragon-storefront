import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-dragon-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">D</span>
              </div>
              <span className="font-bold text-xl text-white">Dragon Automation</span>
            </div>
            <p className="text-gray-400 text-sm">
              Giải pháp linh kiện cơ khí chính xác cho ngành tự động hóa.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Danh mục</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/shop" className="hover:text-dragon-400 transition-colors">Ổ bi</Link></li>
              <li><Link href="/shop" className="hover:text-dragon-400 transition-colors">Bánh răng</Link></li>
              <li><Link href="/shop" className="hover:text-dragon-400 transition-colors">Puly</Link></li>
              <li><Link href="/shop" className="hover:text-dragon-400 transition-colors">Trục</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Liên hệ</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>ĐT: (+84) 123 456 789</li>
              <li>Email: info@dragonautomation.com</li>
              <li>Khu công nghiệp, Việt Nam</li>
              <li className="pt-2">
                <Link href="/about" className="text-dragon-400 hover:text-dragon-300 transition-colors">
                  Giới thiệu →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          &copy; 2026 Dragon Automation. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
