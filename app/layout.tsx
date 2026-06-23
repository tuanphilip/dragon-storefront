import Header from '@/components/Header'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Dragon Automation - Linh kiện cơ khí chính xác',
  description: 'Nhà cung cấp ổ bi, bánh răng, puly, trục cho ngành tự động hóa',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
