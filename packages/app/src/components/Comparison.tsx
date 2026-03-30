'use client'

import React, { useEffect, useState } from 'react'

interface ComparisonRow {
  without: string
  with: string
}

const comparisonData: ComparisonRow[] = [
  {
    without: 'One identity vendor (ONCHAINID)',
    with: 'Any EAS-compatible KYC provider',
  },
  {
    without: 'Deploy identity contract per investor ($$$)',
    with: 'Reuse existing attestations (free)',
  },
  {
    without: 'Re-verify on every chain',
    with: 'One KYC, works everywhere',
  },
  {
    without: 'Revocation = manual process',
    with: 'Revoke once, blocked instantly',
  },
]

export function Comparison() {
  const [visibleRows, setVisibleRows] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const timer = setInterval(() => {
            setVisibleRows((prev) => {
              if (prev >= comparisonData.length) {
                clearInterval(timer)
                return prev
              }
              return prev + 1
            })
          }, 300)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    const element = document.getElementById('comparison-section')
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section id='comparison-section' className='py-20 px-4'>
      <div className='max-w-5xl mx-auto'>
        <h2 className='text-3xl md:text-4xl font-bold text-center mb-4 text-white'>The Problem We&apos;re Solving</h2>
        <p className='text-slate-400 text-center mb-12 max-w-2xl mx-auto'>
          ERC-3643 security tokens need compliant identity verification. Today, that means vendor lock-in. Tomorrow, it
          doesn&apos;t have to.
        </p>

        {/* Desktop Table */}
        <div className='hidden md:block'>
          <div className='grid grid-cols-2 gap-4 mb-4'>
            <div className='text-center'>
              <span className='inline-flex items-center gap-2 text-lg font-semibold text-red-400'>
                <span className='text-2xl'>🔴</span> WITHOUT the Bridge (Today)
              </span>
            </div>
            <div className='text-center'>
              <span className='inline-flex items-center gap-2 text-lg font-semibold text-green-400'>
                <span className='text-2xl'>🟢</span> WITH the Bridge
              </span>
            </div>
          </div>

          {comparisonData.map((row, index) => (
            <div
              key={index}
              className={`grid grid-cols-2 gap-4 mb-3 transition-all duration-500 ${
                index < visibleRows ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <div className='bg-red-950/30 border border-red-900/30 rounded-lg p-4 flex items-center'>
                <span className='text-red-400 mr-3'>✗</span>
                <span className='text-slate-300'>{row.without}</span>
              </div>
              <div className='bg-green-950/30 border border-green-900/30 rounded-lg p-4 flex items-center'>
                <span className='text-green-400 mr-3'>✓</span>
                <span className='text-slate-300'>{row.with}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Cards */}
        <div className='md:hidden space-y-6'>
          <div className='space-y-3'>
            <h3 className='text-lg font-semibold text-red-400 flex items-center gap-2'>
              <span className='text-xl'>🔴</span> WITHOUT the Bridge
            </h3>
            {comparisonData.map((row, index) => (
              <div
                key={index}
                className={`bg-red-950/30 border border-red-900/30 rounded-lg p-4 transition-all duration-500 ${
                  index < visibleRows ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                }`}
              >
                <span className='text-red-400 mr-2'>✗</span>
                <span className='text-slate-300'>{row.without}</span>
              </div>
            ))}
          </div>

          <div className='space-y-3'>
            <h3 className='text-lg font-semibold text-green-400 flex items-center gap-2'>
              <span className='text-xl'>🟢</span> WITH the Bridge
            </h3>
            {comparisonData.map((row, index) => (
              <div
                key={index}
                className={`bg-green-950/30 border border-green-900/30 rounded-lg p-4 transition-all duration-500 ${
                  index < visibleRows ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                }`}
              >
                <span className='text-green-400 mr-2'>✓</span>
                <span className='text-slate-300'>{row.with}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
