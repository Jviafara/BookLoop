import type { Metadata } from 'next'
import { Bebas_Neue, IBM_Plex_Sans } from 'next/font/google'
import './globals.css'

const bebasNeue = Bebas_Neue({
  variable: '--bebas-neue',
  subsets: ['latin'],
  weight: '400',
})

const ibmPlexSans = IBM_Plex_Sans({
  variable: '--font-ibm-plex-sans',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'BookLoop',
  description:
    'BookLoop is a web application that allows users to manage their book collections, track reading progress, and discover new books. It provides a user-friendly interface for organizing books, creating reading lists, and sharing recommendations with others.',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang='en'>
      <body className={`${bebasNeue.variable} ${ibmPlexSans.variable} h-full antialiased`}>{children}</body>
    </html>
  )
}
