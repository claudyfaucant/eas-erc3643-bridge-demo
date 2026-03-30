'use client'

import React, { useEffect, useState } from 'react'
import { IMPACT_STATS } from '@/lib/constants'

export function WhyItMatters() {
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

    const element = document.getElementById('why-it-matters')
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section id='why-it-matters' className='py-16'>
      <h2 className='text-3xl font-bold text-center mb-4 text-white'>Why This Matters</h2>
      <p className='text-slate-400 text-center mb-12 max-w-2xl mx-auto'>
        The EAS-ERC3643 bridge unlocks massive efficiency gains for security token compliance.
      </p>

      <div className='grid md:grid-cols-3 gap-6 max-w-4xl mx-auto'>
        {/* Gas Saved */}
        <div
          className={`stat-card rounded-xl p-8 text-center transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className='text-5xl mb-4'>⛽</div>
          <div className='text-4xl font-bold text-blue-400 mb-2'>{IMPACT_STATS.gasSaved}</div>
          <div className='text-lg text-white font-semibold mb-2'>Gas Saved</div>
          <p className='text-sm text-slate-400'>No per-investor identity contract deployment required</p>
        </div>

        {/* Multi-chain */}
        <div
          className={`stat-card rounded-xl p-8 text-center transition-all duration-700 delay-150 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className='text-5xl mb-4'>🔗</div>
          <div className='text-4xl font-bold text-blue-400 mb-2'>
            1 KYC → {IMPACT_STATS.chainsSupported} Chains
          </div>
          <div className='text-lg text-white font-semibold mb-2'>Cross-Chain Ready</div>
          <div className='flex flex-wrap justify-center gap-2 mt-3'>
            {IMPACT_STATS.chains.map((chain) => (
              <span key={chain} className='badge badge-outline border-blue-500/50 text-blue-400 text-xs'>
                {chain}
              </span>
            ))}
          </div>
        </div>

        {/* Instant Revocation */}
        <div
          className={`stat-card rounded-xl p-8 text-center transition-all duration-700 delay-300 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className='text-5xl mb-4'>⚡</div>
          <div className='text-4xl font-bold text-blue-400 mb-2'>{IMPACT_STATS.revocationTime}</div>
          <div className='text-lg text-white font-semibold mb-2'>Enforcement Time</div>
          <p className='text-sm text-slate-400'>Instant compliance enforcement after attestation revocation</p>
        </div>
      </div>
    </section>
  )
}
