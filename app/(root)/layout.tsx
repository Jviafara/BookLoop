import Header from '@/components/Header'
import { ReactNode } from 'react'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <main className='root-container'>
        <div className='mx-auto max-w-7xl'>
          {/* Header */}
          <Header />
          {/* Header */}
          <div className='mt-20 pb-20'>{children}</div>
        </div>
      </main>
    </div>
  )
}

export default Layout
