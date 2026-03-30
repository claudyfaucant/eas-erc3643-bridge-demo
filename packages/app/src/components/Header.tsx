import React from 'react'
import { LinkComponent } from './LinkComponent'
import { SITE_EMOJI, SITE_NAME } from '@/utils/site'
import { Connect } from './Connect'
import { NotificationsDrawer } from './NotificationsDrawer'

export function Header() {
  return (
    <header className='navbar flex justify-between p-4 pt-4 border-b border-base-300'>
      <div className='flex items-center gap-6'>
        <LinkComponent href='/'>
          <div className='flex items-center gap-2'>
            <span className='text-2xl'>{SITE_EMOJI}</span>
            <span className='font-bold text-lg hidden sm:inline'>{SITE_NAME}</span>
          </div>
        </LinkComponent>
        <nav className='hidden md:flex gap-4'>
          <LinkComponent href='/demo' className='text-base-content/70 hover:text-base-content transition-colors'>
            Demo
          </LinkComponent>
          <LinkComponent href='/explorer' className='text-base-content/70 hover:text-base-content transition-colors'>
            Explorer
          </LinkComponent>
        </nav>
      </div>

      <div className='flex gap-2'>
        <Connect />
        <NotificationsDrawer />
      </div>
    </header>
  )
}
