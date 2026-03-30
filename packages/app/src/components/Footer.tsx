import React from 'react'
import { SITE_EMOJI, SOCIAL_GITHUB } from '@/utils/site'
import { FaGithub } from 'react-icons/fa6'
import { LinkComponent } from './LinkComponent'

export function Footer() {
  return (
    <footer className='border-t border-slate-700/50 bg-[#0f172a]'>
      <div className='container max-w-5xl mx-auto px-4 py-8'>
        <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
          <div className='flex items-center gap-2 text-slate-400'>
            <span className='text-xl'>{SITE_EMOJI}</span>
            <span>Built by the</span>
            <LinkComponent href='https://entethalliance.org' className='text-blue-400 hover:text-blue-300 transition-colors'>
              Enterprise Ethereum Alliance
            </LinkComponent>
          </div>
          <div className='flex gap-6'>
            <LinkComponent
              href={`https://github.com/${SOCIAL_GITHUB}`}
              className='text-slate-400 hover:text-white transition-colors flex items-center gap-2'
            >
              <FaGithub className='text-lg' />
              <span className='hidden sm:inline'>View on GitHub</span>
            </LinkComponent>
          </div>
        </div>
        <div className='mt-6 pt-6 border-t border-slate-700/30 text-center text-sm text-slate-500'>
          <p>This is a demonstration UI. No wallet connection required. No real transactions.</p>
        </div>
      </div>
    </footer>
  )
}
