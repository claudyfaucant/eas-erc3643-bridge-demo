'use client'

import { useState, useCallback } from 'react'
import { useAttestation } from '@/hooks/useAttestation'
import { DeployedContracts } from '@/lib/contracts'
import { DEMO_INVESTORS } from '@/lib/constants'
import { AddressLink } from './TxLink'

interface Step7VerifyProps {
  deployedContracts: DeployedContracts
  onComplete: () => void
}

interface VerificationResults {
  alice: boolean | null
  bob: boolean | null
  charlie: boolean | null
}

export function Step7Verify({ deployedContracts, onComplete }: Step7VerifyProps) {
  const { verifyInvestor } = useAttestation()
  const [results, setResults] = useState<VerificationResults>({
    alice: null,
    bob: null,
    charlie: null,
  })
  const [isVerifying, setIsVerifying] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const allVerified = results.alice !== null && results.bob !== null && results.charlie !== null

  if (allVerified && results.alice && results.bob && !results.charlie) {
    onComplete()
  }

  const handleVerifyAll = useCallback(async () => {
    setError(null)
    setIsVerifying(true)

    try {
      const [aliceResult, bobResult, charlieResult] = await Promise.all([
        verifyInvestor(deployedContracts, DEMO_INVESTORS.ALICE.address),
        verifyInvestor(deployedContracts, DEMO_INVESTORS.BOB.address),
        verifyInvestor(deployedContracts, DEMO_INVESTORS.CHARLIE.address),
      ])

      setResults({
        alice: aliceResult,
        bob: bobResult,
        charlie: charlieResult,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Verification failed')
    } finally {
      setIsVerifying(false)
    }
  }, [verifyInvestor, deployedContracts])

  const handleVerifySingle = async (investor: keyof VerificationResults) => {
    setError(null)
    setIsVerifying(true)

    try {
      const address = DEMO_INVESTORS[investor.toUpperCase() as keyof typeof DEMO_INVESTORS].address
      const result = await verifyInvestor(deployedContracts, address)
      setResults((prev) => ({ ...prev, [investor]: result }))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Verification failed')
    } finally {
      setIsVerifying(false)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-base-content/70">
        This is the payoff! Verify each investor&apos;s eligibility using the bridge. Alice and Bob should
        be eligible, while Charlie (who has no attestation) should not be eligible.
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
        <VerificationCard
          name="Alice"
          description="US Accredited Investor"
          address={DEMO_INVESTORS.ALICE.address}
          result={results.alice}
          expectedResult={true}
          onVerify={() => handleVerifySingle('alice')}
          isVerifying={isVerifying}
        />

        <VerificationCard
          name="Bob"
          description="EU Professional Investor"
          address={DEMO_INVESTORS.BOB.address}
          result={results.bob}
          expectedResult={true}
          onVerify={() => handleVerifySingle('bob')}
          isVerifying={isVerifying}
        />

        <VerificationCard
          name="Charlie"
          description="Rejected - No KYC"
          address={DEMO_INVESTORS.CHARLIE.address}
          result={results.charlie}
          expectedResult={false}
          onVerify={() => handleVerifySingle('charlie')}
          isVerifying={isVerifying}
        />
      </div>

      <button
        className="btn btn-primary"
        onClick={handleVerifyAll}
        disabled={isVerifying}
      >
        {isVerifying ? (
          <>
            <span className="loading loading-spinner loading-sm"></span>
            Verifying...
          </>
        ) : (
          'Verify All'
        )}
      </button>
    </div>
  )
}

interface VerificationCardProps {
  name: string
  description: string
  address: `0x${string}`
  result: boolean | null
  expectedResult: boolean
  onVerify: () => void
  isVerifying: boolean
}

function VerificationCard({
  name,
  description,
  address,
  result,
  expectedResult,
  onVerify,
  isVerifying,
}: VerificationCardProps) {
  const getResultDisplay = () => {
    if (result === null) {
      return {
        badge: <span className="badge badge-ghost">Not checked</span>,
        icon: null,
      }
    }

    if (result) {
      return {
        badge: <span className="badge badge-success gap-1">ELIGIBLE</span>,
        icon: (
          <div className="text-4xl text-success">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="currentColor"
              className="w-10 h-10"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
        ),
      }
    }

    return {
      badge: <span className="badge badge-error gap-1">NOT ELIGIBLE</span>,
      icon: (
        <div className="text-4xl text-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="w-10 h-10"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      ),
    }
  }

  const { badge, icon } = getResultDisplay()

  return (
    <div
      className={`card bg-base-100 shadow-md border-2 ${
        result === null
          ? 'border-base-300'
          : result
          ? 'border-success'
          : 'border-error'
      }`}
    >
      <div className="card-body p-4 items-center text-center">
        {icon && <div className="mb-2">{icon}</div>}

        <h4 className="card-title text-lg">{name}</h4>
        <p className="text-sm text-base-content/60">{description}</p>

        <div className="my-2">
          <AddressLink address={address} />
        </div>

        {badge}

        {result === null && (
          <button
            className="btn btn-sm btn-outline mt-2"
            onClick={onVerify}
            disabled={isVerifying}
          >
            Check
          </button>
        )}

        {result !== null && result !== expectedResult && (
          <div className="mt-2 text-xs text-warning">
            (Unexpected result - check previous steps)
          </div>
        )}
      </div>
    </div>
  )
}
