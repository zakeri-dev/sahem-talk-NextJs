// Next Imports
import type { Metadata } from 'next'

import localFont from 'next/font/local'
import { Inter } from 'next/font/google'

import '../globals.css'
import { ThemeProvider } from '@/providers/theme-provider'
import { Toaster } from '@/components/ui/sonner'

// const inter = Inter({ subsets: ["latin"] });
const IRANSansX = localFont({
  src: [
    {
      path: '../../assets/fonts/Woff2/IRANSansXFaNum-Regular.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../../assets/fonts/Woff2/IRANSansXFaNum-Medium.woff2',
      weight: '500',
      style: 'normal'
    },
    {
      path: '../../assets/fonts/Woff2/IRANSansXFaNum-DemiBold.woff2',
      weight: '600',
      style: 'normal'
    },
    {
      path: '../../assets/fonts/Woff2/IRANSansXFaNum-Bold.woff2',
      weight: '700',
      style: 'normal'
    },
    {
      path: '../../assets/fonts/Woff2/IRANSansXFaNum-ExtraBold.woff2',
      weight: '800',
      style: 'normal'
    }
  ]
})

export const metadata: Metadata = {
  title: 'دانا',
  description: 'محیط گفتگو با هوش مصنوعی'
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: 1
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='fa' dir='rtl'>
      <body className={`antialiased tracking-tight ${IRANSansX.className}`}>
        <ThemeProvider attribute='class' defaultTheme='dark'>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
