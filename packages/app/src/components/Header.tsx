'use client'

import React from 'react'
import { LinkComponent } from './LinkComponent'
import { SITE_EMOJI, SITE_NAME } from '@/utils/site'

export function Header() {
  return (
    <header className='navbar flex justify-between p-4 pt-4 border-b border-slate-700/50 bg-[#0f172a]/80 backdrop-blur-sm sticky top-0 z-50'>
      <div className='flex items-center gap-6'>
        <LinkComponent href='/'>
          <div className='flex items-center gap-2 hover:opacity-80 transition-opacity'>
            <span className='text-2xl'>{SITE_EMOJI}</span>
            <span className='font-bold text-lg hidden sm:inline text-white'>{SITE_NAME}</span>
          </div>
        </LinkComponent>
        <nav className='hidden md:flex gap-4'>
          <LinkComponent href='/demo' className='text-slate-400 hover:text-white transition-colors'>
            Interactive Demo
          </LinkComponent>
          <LinkComponent href='/standards' className='text-slate-400 hover:text-white transition-colors'>
            Standards
          </LinkComponent>
        </nav>
      </div>

      <div className='flex gap-2'>
        <LinkComponent
          href='https://github.com/EntEthAlliance/eas-3643-bridge'
          className='btn btn-sm btn-ghost text-slate-400 hover:text-white'
        >
          GitHub
        </LinkComponent>
      </div>
    </header>
  )
}
