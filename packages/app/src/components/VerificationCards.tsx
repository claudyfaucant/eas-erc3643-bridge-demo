'use client'

import React, { useState } from 'react'
import { DEMO_INVESTORS } from '@/lib/constants'

type InvestorKey = 'ALICE' | 'BOB' | 'CHARLIE'
type VerificationStatus = 'idle' | 'checking' | 'eligible' | 'not-eligible'

export function VerificationCards() {
  const [statuses, setStatuses] = useState<Record<InvestorKey, VerificationStatus>>({
    ALICE: 'idle',
    BOB: 'idle',
    CHARLIE: 'idle',
  })

  const verify = async (key: InvestorKey) => {
    setStatuses((prev) => ({ ...prev, [key]: 'checking' }))
    await new Promise((r) => setTimeout(r, 1200))
    const investor = DEMO_INVESTORS[key]
    setStatuses((prev) => ({
      ...prev,
      [key]: investor.verified ? 'eligible' : 'not-eligible',
    }))
  }

  const verifyAll = async () => {
    for (const key of ['ALICE', 'BOB', 'CHARLIE'] as InvestorKey[]) {
      await verify(key)
      await new Promise((r) => setTimeout(r, 300))
    }
  }

  const reset = () => {
    setStatuses({ ALICE: 'idle', BOB: 'idle', CHARLIE: 'idle' })
  }

  return (
    <section className='py-16'>
      <h2 className='text-3xl font-bold text-center mb-4 text-white'>The Fund Checks Eligibility</h2>
      <p className='text-slate-400 text-center mb-8 max-w-2xl mx-auto'>
        The token contract calls <code className='text-blue-400'>isVerified()</code> — returns true only if the investor
        has valid attestations from a trusted provider.
      </p>

      <div className='flex justify-center gap-4 mb-8'>
        <button onClick={verifyAll} className='btn bg-blue-600 hover:bg-blue-500 border-none text-white'>
          Verify All Investors
        </button>
        <button onClick={reset} className='btn btn-outline border-slate-600 text-slate-400 hover:bg-slate-700'>
          Reset
        </button>
      </div>

      <div className='grid md:grid-cols-3 gap-6 max-w-5xl mx-auto'>
        {(Object.keys(DEMO_INVESTORS) as InvestorKey[]).map((key) => {
          const investor = DEMO_INVESTORS[key]
          const status = statuses[key]

          return (
            <div
              key={key}
              className={`relative bg-slate-800/50 border rounded-xl p-6 transition-all duration-500 overflow-hidden ${
                status === 'eligible'
                  ? 'border-green-500 verified-glow'
                  : status === 'not-eligible'
                    ? 'border-red-500 rejected-shake animate-shake'
                    : 'border-slate-700'
              }`}
            >
              {/* Background glow effect for eligible */}
              {status === 'eligible' && (
                <div className='absolute inset-0 bg-green-500/5 animate-pulse pointer-events-none'></div>
              )}

              <div className='relative z-10'>
                <div className='flex items-center gap-3 mb-6'>
                  <span className='text-4xl'>{investor.emoji}</span>
                  <div>
                    <h4 className='font-bold text-white text-lg'>{investor.name}</h4>
                    <p className='text-sm text-slate-400'>{investor.description}</p>
                  </div>
                </div>

                {/* Result Display */}
                <div className='min-h-[120px] flex flex-col items-center justify-center'>
                  {status === 'idle' && (
                    <button
                      onClick={() => verify(key)}
                      className='btn bg-blue-600 hover:bg-blue-500 border-none text-white w-full'
                    >
                      Verify {investor.name}
                    </button>
                  )}

                  {status === 'checking' && (
                    <div className='text-center'>
                      <span className='loading loading-spinner loading-lg text-blue-500'></span>
                      <p className='text-slate-400 mt-2'>Checking eligibility...</p>
                      <div className='w-full bg-slate-700 rounded-full h-2 mt-4 overflow-hidden'>
                        <div className='bg-blue-500 h-2 rounded-full animate-progress'></div>
                      </div>
                    </div>
                  )}

                  {status === 'eligible' && (
                    <div className='text-center animate-scale-in'>
                      <div className='w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-3 mx-auto animate-pulse-glow'>
                        <svg className='w-12 h-12 text-green-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={3} d='M5 13l4 4L19 7' />
                        </svg>
                      </div>
                      <h3 className='text-2xl font-bold text-green-400'>ELIGIBLE</h3>
                      <p className='text-slate-400 text-sm mt-1'>Can receive security tokens</p>
                    </div>
                  )}

                  {status === 'not-eligible' && (
                    <div className='text-center animate-scale-in'>
                      <div className='w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center mb-3 mx-auto'>
                        <svg className='w-12 h-12 text-red-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={3} d='M6 18L18 6M6 6l12 12' />
                        </svg>
                      </div>
                      <h3 className='text-2xl font-bold text-red-400'>NOT ELIGIBLE</h3>
                      <p className='text-slate-400 text-sm mt-1'>No valid attestations found</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
