'use client'

import React, { useState } from 'react'
import { DEMO_INVESTORS } from '@/lib/constants'

type CheckResult = 'idle' | 'checking' | 'verified' | 'not-verified'

export function Explorer() {
  const [address, setAddress] = useState('')
  const [result, setResult] = useState<CheckResult>('idle')

  const checkEligibility = async () => {
    if (!address) return

    setResult('checking')
    await new Promise((r) => setTimeout(r, 1500))

    // Check if address matches any verified investor
    const isVerified = Object.values(DEMO_INVESTORS).some(
      (inv) => inv.address.toLowerCase() === address.toLowerCase() && inv.verified
    )

    setResult(isVerified ? 'verified' : 'not-verified')
  }

  const fillExample = (addr: string) => {
    setAddress(addr)
    setResult('idle')
  }

  return (
    <section className='py-16'>
      <h2 className='text-3xl font-bold text-center mb-4 text-white'>Try It Yourself</h2>
      <p className='text-slate-400 text-center mb-8 max-w-2xl mx-auto'>
        Enter any Ethereum address to check if they have valid attestations. (This is simulated — try one of the demo addresses below)
      </p>

      <div className='max-w-lg mx-auto'>
        <div className='bg-slate-800/50 border border-slate-700 rounded-xl p-6'>
          {/* Address Input */}
          <div className='mb-4'>
            <label className='block text-sm font-medium text-slate-400 mb-2'>Wallet Address</label>
            <input
              type='text'
              value={address}
              onChange={(e) => {
                setAddress(e.target.value)
                setResult('idle')
              }}
              placeholder='0x...'
              className='input input-bordered w-full bg-slate-900 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500'
            />
          </div>

          {/* Quick Fill Buttons */}
          <div className='mb-6'>
            <p className='text-xs text-slate-500 mb-2'>Quick fill:</p>
            <div className='flex flex-wrap gap-2'>
              {Object.values(DEMO_INVESTORS).map((inv) => (
                <button
                  key={inv.name}
                  onClick={() => fillExample(inv.address)}
                  className={`btn btn-xs ${
                    inv.verified
                      ? 'btn-outline border-green-600 text-green-400 hover:bg-green-600 hover:text-white'
                      : 'btn-outline border-red-600 text-red-400 hover:bg-red-600 hover:text-white'
                  }`}
                >
                  {inv.emoji} {inv.name}
                </button>
              ))}
            </div>
          </div>

          {/* Check Button */}
          <button
            onClick={checkEligibility}
            disabled={!address || result === 'checking'}
            className='btn bg-blue-600 hover:bg-blue-500 border-none text-white w-full gap-2 disabled:opacity-50'
          >
            {result === 'checking' ? (
              <>
                <span className='loading loading-spinner loading-sm'></span>
                Checking...
              </>
            ) : (
              <>
                <svg className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
                </svg>
                Check Eligibility
              </>
            )}
          </button>

          {/* Results */}
          {result === 'verified' && (
            <div className='mt-6 bg-green-950/50 border border-green-700/50 rounded-lg p-4 animate-scale-in'>
              <div className='flex items-center gap-3'>
                <div className='w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center'>
                  <svg className='w-6 h-6 text-green-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={3} d='M5 13l4 4L19 7' />
                  </svg>
                </div>
                <div>
                  <h4 className='font-bold text-green-400'>Verified Investor</h4>
                  <p className='text-sm text-slate-400'>This address has valid attestations from a trusted issuer.</p>
                </div>
              </div>
            </div>
          )}

          {result === 'not-verified' && (
            <div className='mt-6 bg-red-950/50 border border-red-700/50 rounded-lg p-4 animate-scale-in'>
              <div className='flex items-center gap-3'>
                <div className='w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center'>
                  <svg className='w-6 h-6 text-red-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={3} d='M6 18L18 6M6 6l12 12' />
                  </svg>
                </div>
                <div>
                  <h4 className='font-bold text-red-400'>Not Verified</h4>
                  <p className='text-sm text-slate-400'>No valid attestations found for this address.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Link to Real Explorer */}
        <div className='mt-6 text-center'>
          <a
            href='https://sepolia.easscan.org/'
            target='_blank'
            rel='noopener noreferrer'
            className='text-blue-400 hover:text-blue-300 transition-colors text-sm inline-flex items-center gap-1'
          >
            View real attestations on EAS Scan
            <svg className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14' />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
