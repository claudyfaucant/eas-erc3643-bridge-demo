import React, { PropsWithChildren } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'

export function Layout(props: PropsWithChildren) {
  return (
    <div className='flex flex-col min-h-screen bg-base-100'>
      <Header />

      <main className='grow px-4 container max-w-5xl mx-auto py-6'>{props.children}</main>

      <Footer />
    </div>
  )
}
