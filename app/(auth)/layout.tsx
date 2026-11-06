import { auth } from '@/auth'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { ReactNode, Suspense } from 'react'

async function AuthRedirect({ children }: { children: ReactNode }) {
  const session = await auth()
  if (session) redirect('/')

  return (
    <>
      <section className='auth-form'>
        <div className='auth-box'>
          <div className='flex flex-row gap-2'>
            <Image
              src={'/icons/logo.svg'}
              alt='logo'
              width={37}
              height={37}
              loading='eager'
              className='w-9.25 h-9.25'
            />
            <h1 className='text-2xl font-semibold text-white'>BookLoop</h1>
          </div>
          <div>{children}</div>
        </div>
      </section>
      <section className='auth-illustration'>
        <Image
          src={'/images/auth-illustration.png'}
          alt='Auth illustration'
          width={1000}
          height={1000}
          className='size-full object-cover'
        />
      </section>
    </>
  )
}

const Layout = async ({ children }: { children: ReactNode }) => {
  return (
    <main className='auth-container'>
      <Suspense fallback={<div>Loading...</div>}>
        <AuthRedirect>{children}</AuthRedirect>
      </Suspense>
    </main>
  )
}

export default Layout
