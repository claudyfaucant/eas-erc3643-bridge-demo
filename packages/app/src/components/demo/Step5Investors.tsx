'use client'

import { useState } from 'react'
import { useAttestation, InvestorData } from '@/hooks/useAttestation'
import { DEMO_INVESTORS } from '@/lib/constants'
import { AttestationUIDs } from '@/lib/contracts'
import { AddressLink } from './TxLink'

interface Step5InvestorsProps {
  schemaUID: `0x${string}` | null
  attestationUIDs: AttestationUIDs
  onAttestationCreated: (uids: AttestationUIDs) => void
  onComplete: () => void
}

export function Step5Investors({
  schemaUID,
  attestationUIDs,
  onAttestationCreated,
  onComplete,
}: Step5InvestorsProps) {
  const { createAttestation } = useAttestation()
  const [error, setError] = useState<string | null>(null)
  const [creatingFor, setCreatingFor] = useState<string | null>(null)

  const hasAliceAttestation = !!(attestationUIDs.alice.kyc && attestationUIDs.alice.accreditation)
  const hasBobAttestation = !!(attestationUIDs.bob.kyc && attestationUIDs.bob.accreditation)

  // Check if we can mark step as complete
  if (hasAliceAttestation && hasBobAttestation) {
    onComplete()
  }

  const handleCreateAttestation = async (investorKey: 'alice' | 'bob') => {
    if (!schemaUID) {
      setError('Schema not registered')
      return
    }

    setError(null)
    setCreatingFor(investorKey)

    try {
      const investor = DEMO_INVESTORS[investorKey.toUpperCase() as keyof typeof DEMO_INVESTORS]
      const investorData: InvestorData = {
        address: investor.address,
        kycStatus: investor.kycStatus,
        accreditationType: investor.accreditationType,
        countryCode: investor.countryCode,
      }

      // Create KYC attestation
      const kycUID = await createAttestation(schemaUID, investorData)

      // Create Accreditation attestation (same data, different purpose)
      const accredUID = await createAttestation(schemaUID, investorData)

      const newUIDs: AttestationUIDs = {
        ...attestationUIDs,
        [investorKey]: {
          kyc: kycUID,
          accreditation: accredUID,
        },
      }

      onAttestationCreated(newUIDs)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create attestation')
    } finally {
      setCreatingFor(null)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-base-content/70">
        Create EAS attestations for the demo investor personas. Alice and Bob will receive
        attestations, while Charlie represents a rejected investor with no attestation.
      </p>

      {error && (
        <div className="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
          <span>{error}</span>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-3">
        {/* Alice Card */}
        <InvestorCard
          name={DEMO_INVESTORS.ALICE.name}
          description={DEMO_INVESTORS.ALICE.description}
          address={DEMO_INVESTORS.ALICE.address}
          countryCode={DEMO_INVESTORS.ALICE.countryCode}
          hasAttestation={hasAliceAttestation}
          attestationUIDs={attestationUIDs.alice}
          isCreating={creatingFor === 'alice'}
          onCreateAttestation={() => handleCreateAttestation('alice')}
        />

        {/* Bob Card */}
        <InvestorCard
          name={DEMO_INVESTORS.BOB.name}
          description={DEMO_INVESTORS.BOB.description}
          address={DEMO_INVESTORS.BOB.address}
          countryCode={DEMO_INVESTORS.BOB.countryCode}
          hasAttestation={hasBobAttestation}
          attestationUIDs={attestationUIDs.bob}
          isCreating={creatingFor === 'bob'}
          onCreateAttestation={() => handleCreateAttestation('bob')}
        />

        {/* Charlie Card */}
        <InvestorCard
          name={DEMO_INVESTORS.CHARLIE.name}
          description={DEMO_INVESTORS.CHARLIE.description}
          address={DEMO_INVESTORS.CHARLIE.address}
          countryCode={DEMO_INVESTORS.CHARLIE.countryCode}
          hasAttestation={false}
          attestationUIDs={{ kyc: null, accreditation: null }}
          isCreating={false}
          onCreateAttestation={() => {}}
          isRejected
        />
      </div>
    </div>
  )
}

interface InvestorCardProps {
  name: string
  description: string
  address: `0x${string}`
  countryCode: number
  hasAttestation: boolean
  attestationUIDs: { kyc: `0x${string}` | null; accreditation: `0x${string}` | null }
  isCreating: boolean
  onCreateAttestation: () => void
  isRejected?: boolean
}

function InvestorCard({
  name,
  description,
  address,
  countryCode,
  hasAttestation,
  attestationUIDs,
  isCreating,
  onCreateAttestation,
  isRejected,
}: InvestorCardProps) {
  const countryName = countryCode === 840 ? 'USA' : countryCode === 276 ? 'Germany' : 'Unknown'

  return (
    <div className={`card bg-base-100 shadow-md border-2 ${
      isRejected ? 'border-error/30' : hasAttestation ? 'border-success/30' : 'border-base-300'
    }`}>
      <div className="card-body p-4">
        <div className="flex items-center justify-between mb-2">
          <h4 className="card-title text-base">{name}</h4>
          {isRejected ? (
            <span className="badge badge-error badge-sm">Rejected</span>
          ) : hasAttestation ? (
            <span className="badge badge-success badge-sm">Attested</span>
          ) : (
            <span className="badge badge-ghost badge-sm">Pending</span>
          )}
        </div>

        <p className="text-sm text-base-content/70 mb-3">{description}</p>

        <div className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-base-content/50">Address:</span>
            <AddressLink address={address} />
          </div>
          <div className="flex justify-between">
            <span className="text-base-content/50">Country:</span>
            <span>{countryName} ({countryCode})</span>
          </div>
        </div>

        {hasAttestation && attestationUIDs.kyc && (
          <div className="mt-3 p-2 bg-base-200 rounded text-xs space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-base-content/50">KYC UID:</span>
              <span className="font-mono truncate max-w-[100px]">{attestationUIDs.kyc.slice(0, 10)}...</span>
            </div>
            {attestationUIDs.accreditation && (
              <div className="flex justify-between items-center">
                <span className="text-base-content/50">Accred UID:</span>
                <span className="font-mono truncate max-w-[100px]">{attestationUIDs.accreditation.slice(0, 10)}...</span>
              </div>
            )}
          </div>
        )}

        {isRejected ? (
          <div className="mt-3 p-2 bg-error/10 rounded text-xs text-error">
            No attestation created (KYC not verified)
          </div>
        ) : !hasAttestation && (
          <button
            className="btn btn-primary btn-sm mt-3"
            onClick={onCreateAttestation}
            disabled={isCreating}
          >
            {isCreating ? (
              <>
                <span className="loading loading-spinner loading-xs"></span>
                Creating...
              </>
            ) : (
              'Create EAS Attestation'
            )}
          </button>
        )}
      </div>
    </div>
  )
}
