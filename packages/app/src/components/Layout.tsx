import React, { PropsWithChildren } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'

export function Layout(props: PropsWithChildren) {
  return (
    <div className='flex flex-col min-h-screen bg-[#0f172a] text-slate-100'>
      <Header />
      <main className='grow'>{props.children}</main>
      <Footer />
    </div>
  )
}
