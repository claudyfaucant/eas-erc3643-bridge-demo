'use client'

import React, { useState } from 'react'
import { DEMO_INVESTORS, FAKE_ATTESTATION_UIDS } from '@/lib/constants'

type InvestorKey = 'ALICE' | 'BOB' | 'CHARLIE'

interface AttestationState {
  status: 'idle' | 'verifying' | 'complete' | 'failed'
  checks: {
    id: boolean
    aml: boolean
    accreditation: boolean
  }
}

export function AttestationFlow() {
  const [attestations, setAttestations] = useState<Record<InvestorKey, AttestationState>>({
    ALICE: { status: 'idle', checks: { id: false, aml: false, accreditation: false } },
    BOB: { status: 'idle', checks: { id: false, aml: false, accreditation: false } },
    CHARLIE: { status: 'idle', checks: { id: false, aml: false, accreditation: false } },
  })

  const runAttestation = async (key: InvestorKey) => {
    const investor = DEMO_INVESTORS[key]

    setAttestations((prev) => ({
      ...prev,
      [key]: { status: 'verifying', checks: { id: false, aml: false, accreditation: false } },
    }))

    // Simulate ID check
    await new Promise((r) => setTimeout(r, 600))
    setAttestations((prev) => ({
      ...prev,
      [key]: { ...prev[key], checks: { ...prev[key].checks, id: investor.verified } },
    }))

    // Simulate AML check
    await new Promise((r) => setTimeout(r, 600))
    setAttestations((prev) => ({
      ...prev,
      [key]: { ...prev[key], checks: { ...prev[key].checks, aml: investor.verified } },
    }))

    // Simulate accreditation check
    await new Promise((r) => setTimeout(r, 600))
    setAttestations((prev) => ({
      ...prev,
      [key]: {
        status: investor.verified ? 'complete' : 'failed',
        checks: {
          id: investor.verified,
          aml: investor.verified,
          accreditation: investor.verified,
        },
      },
    }))
  }

  const runAll = async () => {
    await runAttestation('ALICE')
    await runAttestation('BOB')
    await runAttestation('CHARLIE')
  }

  const resetAll = () => {
    setAttestations({
      ALICE: { status: 'idle', checks: { id: false, aml: false, accreditation: false } },
      BOB: { status: 'idle', checks: { id: false, aml: false, accreditation: false } },
      CHARLIE: { status: 'idle', checks: { id: false, aml: false, accreditation: false } },
    })
  }

  return (
    <section className='py-16'>
      <h2 className='text-3xl font-bold text-center mb-4 text-white'>The KYC Provider Issues Attestations</h2>
      <p className='text-slate-400 text-center mb-8 max-w-2xl mx-auto'>
        VerifyKYC Co. runs identity checks and issues EAS attestations for verified investors.
      </p>

      <div className='flex justify-center gap-4 mb-8'>
        <button onClick={runAll} className='btn bg-blue-600 hover:bg-blue-500 border-none text-white'>
          Run All Verifications
        </button>
        <button onClick={resetAll} className='btn btn-outline border-slate-600 text-slate-400 hover:bg-slate-700'>
          Reset
        </button>
      </div>

      <div className='grid md:grid-cols-3 gap-6 max-w-5xl mx-auto'>
        {(Object.keys(DEMO_INVESTORS) as InvestorKey[]).map((key) => {
          const investor = DEMO_INVESTORS[key]
          const state = attestations[key]

          return (
            <div
              key={key}
              className={`bg-slate-800/50 border rounded-xl p-6 transition-all duration-300 ${
                state.status === 'complete'
                  ? 'border-green-500/50 verified-glow'
                  : state.status === 'failed'
                    ? 'border-red-500/50 rejected-shake'
                    : 'border-slate-700'
              } ${state.status === 'failed' ? 'animate-shake' : ''}`}
            >
              <div className='flex items-center gap-3 mb-4'>
                <span className='text-3xl'>{investor.emoji}</span>
                <div>
                  <h4 className='font-bold text-white'>{investor.name}</h4>
                  <p className='text-sm text-slate-400'>{investor.description}</p>
                </div>
              </div>

              {/* Verification Checks */}
              <div className='space-y-3 mb-4'>
                <CheckItem label='Identity Document' checked={state.checks.id} verifying={state.status === 'verifying' && !state.checks.id} />
                <CheckItem
                  label='AML Screening'
                  checked={state.checks.aml}
                  verifying={state.status === 'verifying' && state.checks.id && !state.checks.aml}
                />
                <CheckItem
                  label='Accreditation'
                  checked={state.checks.accreditation}
                  verifying={state.status === 'verifying' && state.checks.aml && !state.checks.accreditation}
                />
              </div>

              {/* Attestation Result */}
              {state.status === 'complete' && (
                <div className='bg-green-950/50 border border-green-700/50 rounded-lg p-3 animate-scale-in'>
                  <div className='flex items-center gap-2 text-green-400 font-semibold mb-1'>
                    <svg className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                    </svg>
                    EAS Attestation Issued
                  </div>
                  <code className='text-xs text-slate-400 block truncate'>
                    UID: {FAKE_ATTESTATION_UIDS[key as keyof typeof FAKE_ATTESTATION_UIDS] || 'N/A'}
                  </code>
                </div>
              )}

              {state.status === 'failed' && (
                <div className='bg-red-950/50 border border-red-700/50 rounded-lg p-3 animate-scale-in'>
                  <div className='flex items-center gap-2 text-red-400 font-semibold'>
                    <svg className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z' />
                    </svg>
                    KYC Failed — No Attestation
                  </div>
                </div>
              )}

              {state.status === 'idle' && (
                <button
                  onClick={() => runAttestation(key)}
                  className='btn btn-sm btn-outline border-slate-600 text-slate-400 hover:bg-slate-700 w-full'
                >
                  Start KYC
                </button>
              )}

              {state.status === 'verifying' && (
                <div className='flex items-center justify-center gap-2 text-blue-400'>
                  <span className='loading loading-spinner loading-sm'></span>
                  <span>Verifying...</span>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}

function CheckItem({ label, checked, verifying }: { label: string; checked: boolean; verifying: boolean }) {
  return (
    <div className='flex items-center gap-3'>
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
          checked ? 'bg-green-500' : verifying ? 'bg-blue-500' : 'bg-slate-700'
        }`}
      >
        {checked ? (
          <svg className='w-4 h-4 text-white' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={3} d='M5 13l4 4L19 7' />
          </svg>
        ) : verifying ? (
          <span className='loading loading-spinner loading-xs text-white'></span>
        ) : null}
      </div>
      <span className={`text-sm ${checked ? 'text-green-400' : 'text-slate-400'}`}>{label}</span>
    </div>
  )
}
