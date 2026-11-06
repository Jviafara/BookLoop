// app/(root)/layout.tsx
import { auth } from '@/auth'
import Header from '@/components/Header'
import { redirect } from 'next/navigation'
import { ReactNode, Suspense } from 'react'

async function AuthRedirect({ children }: { children: ReactNode }) {
  const session = await auth()
  if (!session) redirect('/sign-in')

  return (
    <div className='mx-auto max-w-7xl'>
      <Header session={session} />
      <div className='mt-20 pb-20'>{children}</div>
    </div>
  )
}

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className='root-container'>
      <Suspense fallback={<div>Loading...</div>}>
        <AuthRedirect>{children}</AuthRedirect>
      </Suspense>
    </main>
  )
}

export default Layout
