'use client'

import { cn } from 'cn'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Header = () => {
  const pathname = usePathname()

  return (
    <header className='my-10 flex justify-between gap-5'>
      <Link href='/'>
        <Image
          src='/icons/logo.svg'
          alt='BookLoop'
          width={40}
          height={40}
          className='w-auto h-auto'
        />
      </Link>
      <ul className=' flex flex-row items-center gap-8'>
        <li>
          <Link
            href='/books'
            className={cn(
              'text-base cursor-pointer capitalize',
              pathname === '/books' ? 'text-light-200' : 'text-light-100',
            )}
          >
            Books
          </Link>
        </li>
      </ul>
    </header>
  )
}

export default Header
