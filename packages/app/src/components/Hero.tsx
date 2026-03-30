'use client'

import React from 'react'
import Link from 'next/link'
import { SITE_EMOJI } from '@/utils/site'

export function Hero() {
  return (
    <section className='hero-gradient min-h-[60vh] flex flex-col items-center justify-center px-4 py-16'>
      <div className='text-center max-w-4xl mx-auto'>
        <div className='text-6xl mb-6 animate-fade-in-up'>{SITE_EMOJI}</div>

        <h1 className='text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up stagger-1 stagger-item'>
          <span className='gradient-text'>Security tokens</span>
          <br />
          <span className='text-slate-300'>shouldn&apos;t require</span>
          <br />
          <span className='text-white'>vendor lock-in for identity</span>
        </h1>

        <p className='text-xl md:text-2xl text-slate-400 mb-10 max-w-2xl mx-auto animate-fade-in-up stagger-2 stagger-item'>
          See how EAS attestations create portable, reusable investor credentials for ERC-3643 compliant tokens.
        </p>

        <div className='flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up stagger-3 stagger-item'>
          <Link
            href='/demo'
            className='btn btn-lg bg-blue-600 hover:bg-blue-500 border-none text-white gap-2 px-8 shadow-lg shadow-blue-600/25'
          >
            See How It Works
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={2}
              stroke='currentColor'
              className='w-5 h-5'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3' />
            </svg>
          </Link>
          <span className='text-slate-500 text-sm'>No wallet required</span>
        </div>
      </div>
    </section>
  )
}
