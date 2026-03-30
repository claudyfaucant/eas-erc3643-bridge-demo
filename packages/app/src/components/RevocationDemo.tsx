'use client'

import React, { useState } from 'react'
import { DEMO_INVESTORS } from '@/lib/constants'

type RevocationStatus = 'active' | 'revoking' | 'revoked'

export function RevocationDemo() {
  const [status, setStatus] = useState<RevocationStatus>('active')

  const revoke = async () => {
    setStatus('revoking')
    await new Promise((r) => setTimeout(r, 800))
    setStatus('revoked')
  }

  const reset = () => {
    setStatus('active')
  }

  const bob = DEMO_INVESTORS.BOB

  return (
    <section className='py-16'>
      <h2 className='text-3xl font-bold text-center mb-4 text-white'>Instant Revocation</h2>
      <p className='text-slate-400 text-center mb-8 max-w-2xl mx-auto'>
        When an investor&apos;s status changes (e.g., AML flag), their attestation is revoked and they&apos;re immediately blocked from trading.
      </p>

      <div className='max-w-md mx-auto'>
        <div
          className={`bg-slate-800/50 border rounded-xl p-6 transition-all duration-500 ${
            status === 'active'
              ? 'border-green-500/50'
              : status === 'revoked'
                ? 'border-red-500/50'
                : 'border-yellow-500/50'
          }`}
        >
          <div className='flex items-center gap-3 mb-6'>
            <span className='text-4xl'>{bob.emoji}</span>
            <div className='flex-1'>
              <h4 className='font-bold text-white text-lg'>{bob.name}</h4>
              <p className='text-sm text-slate-400'>{bob.description}</p>
            </div>

            {/* Status Badge */}
            {status === 'active' && (
              <span className='badge badge-success gap-1 animate-scale-in'>
                <svg className='w-3 h-3' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={3} d='M5 13l4 4L19 7' />
                </svg>
                ELIGIBLE
              </span>
            )}
            {status === 'revoking' && <span className='badge badge-warning gap-1'>PROCESSING...</span>}
            {status === 'revoked' && (
              <span className='badge badge-error gap-1 animate-scale-in'>
                <svg className='w-3 h-3' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={3} d='M6 18L18 6M6 6l12 12' />
                </svg>
                BLOCKED
              </span>
            )}
          </div>

          {/* Attestation Card */}
          <div className={`relative rounded-lg p-4 mb-6 transition-all duration-300 ${
            status === 'revoked' ? 'bg-red-950/30 border border-red-700/50' : 'bg-slate-700/50 border border-slate-600'
          }`}>
            <div className='flex items-center gap-2 mb-2'>
              <span className={status === 'revoked' ? 'text-red-400' : 'text-blue-400'}>📜</span>
              <span className={`font-semibold ${status === 'revoked' ? 'text-red-400' : 'text-slate-300'}`}>
                EAS Attestation
              </span>
            </div>
            <code className='text-xs text-slate-500 block mb-1'>UID: 0x2b7e...9c4a5d6e7f8a</code>
            <div className='text-xs text-slate-500'>
              <span className='mr-4'>Claim: KYC Verified</span>
              <span>Issued: March 2026</span>
            </div>

            {/* REVOKED Stamp */}
            {status === 'revoked' && (
              <div className='absolute inset-0 flex items-center justify-center'>
                <div className='bg-red-600 text-white font-bold text-2xl px-6 py-2 border-4 border-red-800 animate-revoke-stamp'>
                  REVOKED
                </div>
              </div>
            )}
          </div>

          {/* Action Button */}
          {status === 'active' && (
            <button onClick={revoke} className='btn bg-red-600 hover:bg-red-500 border-none text-white w-full gap-2'>
              <svg className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' />
              </svg>
              Revoke KYC (AML Flag Detected)
            </button>
          )}

          {status === 'revoking' && (
            <div className='flex items-center justify-center gap-2 text-yellow-400'>
              <span className='loading loading-spinner loading-sm'></span>
              <span>Processing revocation...</span>
            </div>
          )}

          {status === 'revoked' && (
            <div className='space-y-4'>
              <div className='bg-red-950/30 border border-red-700/50 rounded-lg p-3'>
                <p className='text-red-400 text-sm text-center'>
                  Bob can no longer trade. Immediate. Automatic. No manual intervention needed.
                </p>
              </div>
              <button onClick={reset} className='btn btn-outline border-slate-600 text-slate-400 hover:bg-slate-700 w-full'>
                Reset Demo
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
