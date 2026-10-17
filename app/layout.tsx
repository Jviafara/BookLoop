import type { Metadata } from 'next'
import { Bebas_Neue, IBM_Plex_Sans, Seaweed_Script } from 'next/font/google'
import './globals.css'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas-neue',
  display: 'swap',
})

const ibmPlexSans = IBM_Plex_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-ibm-plex-sans',
  display: 'swap',
})

const seaweedScript = Seaweed_Script({
  variable: '--font-seaweed-script',
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'BookLoop',
  description:
    'BookLoop is a web application that allows users to manage their book collections, track reading progress, and discover new books. It provides a user-friendly interface for organizing books, creating reading lists, and sharing recommendations with others.',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang='en'>
      <body className={`${bebasNeue.variable} ${ibmPlexSans.variable} ${seaweedScript.variable} h-full antialiased`}>
        {children}
      </body>
    </html>
  )
}
