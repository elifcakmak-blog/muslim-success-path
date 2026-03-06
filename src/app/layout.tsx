import type { Metadata } from 'next'
import './globals.css'
import RevealObserver from '@/components/RevealObserver'

export const metadata: Metadata = {
  title: 'Muslim Success Path',
  description: 'Faith-centered resources for learning, creating, and living with intention.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <RevealObserver />
        {children}
      </body>
    </html>
  )
}
