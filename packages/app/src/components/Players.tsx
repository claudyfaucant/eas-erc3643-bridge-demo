'use client'

import React, { useEffect, useState } from 'react'
import { DEMO_INVESTORS } from '@/lib/constants'

export function Players() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    const element = document.getElementById('players-section')
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section id='players-section' className='py-16'>
      <h2 className='text-3xl font-bold text-center mb-4 text-white'>Meet the Players</h2>
      <p className='text-slate-400 text-center mb-12 max-w-2xl mx-auto'>
        A tokenized US Treasury fund needs compliant investors. Let&apos;s see who qualifies.
      </p>

      <div className='grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12'>
        {/* Token Issuer */}
        <div
          className={`bg-slate-800/50 border border-slate-700 rounded-xl p-6 card-hover transition-all duration-500 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className='text-4xl mb-4'>🏛️</div>
          <h3 className='text-xl font-bold text-white mb-2'>Treasury Fund Inc.</h3>
          <p className='text-slate-400'>Token issuer launching a tokenized US Treasury product under ERC-3643</p>
          <div className='mt-4 flex flex-wrap gap-2'>
            <span className='badge badge-outline border-blue-500 text-blue-400'>Security Token</span>
            <span className='badge badge-outline border-blue-500 text-blue-400'>ERC-3643</span>
          </div>
        </div>

        {/* KYC Provider */}
        <div
          className={`bg-slate-800/50 border border-slate-700 rounded-xl p-6 card-hover transition-all duration-500 delay-100 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className='text-4xl mb-4'>🔍</div>
          <h3 className='text-xl font-bold text-white mb-2'>VerifyKYC Co.</h3>
          <p className='text-slate-400'>Licensed KYC provider using EAS attestations for identity verification</p>
          <div className='mt-4 flex flex-wrap gap-2'>
            <span className='badge badge-outline border-blue-500 text-blue-400'>EAS Attestor</span>
            <span className='badge badge-outline border-blue-500 text-blue-400'>Trusted Issuer</span>
          </div>
        </div>
      </div>

      {/* Investors */}
      <h3 className='text-xl font-semibold text-center mb-6 text-slate-300'>The Investors</h3>
      <div className='grid md:grid-cols-3 gap-6 max-w-4xl mx-auto'>
        {Object.values(DEMO_INVESTORS).map((investor, index) => (
          <div
            key={investor.name}
            className={`bg-slate-800/50 border rounded-xl p-6 card-hover transition-all duration-500 ${
              investor.verified ? 'border-slate-700' : 'border-red-900/50'
            } ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: `${200 + index * 100}ms` }}
          >
            <div className='flex items-start justify-between mb-4'>
              <span className='text-4xl'>{investor.emoji}</span>
              {investor.verified ? (
                <span className='badge badge-success gap-1'>
                  <svg className='w-3 h-3' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={3} d='M5 13l4 4L19 7' />
                  </svg>
                  KYC Verified
                </span>
              ) : (
                <span className='badge badge-error gap-1'>
                  <svg className='w-3 h-3' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={3} d='M6 18L18 6M6 6l12 12' />
                  </svg>
                  Unverified
                </span>
              )}
            </div>
            <h4 className='text-lg font-bold text-white mb-1'>{investor.name}</h4>
            <p className='text-slate-400 text-sm mb-3'>{investor.description}</p>
            <div className='flex items-center gap-2 text-sm text-slate-500'>
              <span>{investor.countryFlag}</span>
              <span>{investor.country}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
