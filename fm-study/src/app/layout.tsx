'use client'

import './globals.css'
import { GlobalStyles } from 'twin.macro'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ja'>
      <head />
      <GlobalStyles />
      <body>
        <div tw='bg-gray-400 w-full h-12 rounded-b-xl flex items-center pl-3 font-bold'>
          Framer Motion Library
        </div>
        {children}
      </body>
    </html>
  )
}
