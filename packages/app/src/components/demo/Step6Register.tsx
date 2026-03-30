'use client'

import { useState } from 'react'
import { useAttestation } from '@/hooks/useAttestation'
import { DeployedContracts, AttestationUIDs } from '@/lib/contracts'
import { DEMO_INVESTORS, CLAIM_TOPICS } from '@/lib/constants'
import { TxLink } from './TxLink'

interface Step6RegisterProps {
  deployedContracts: DeployedContracts
  attestationUIDs: AttestationUIDs
  onComplete: () => void
}

interface RegistrationStatus {
  alice: { kyc: boolean; accreditation: boolean }
  bob: { kyc: boolean; accreditation: boolean }
}

export function Step6Register({
  deployedContracts,
  attestationUIDs,
  onComplete,
}: Step6RegisterProps) {
  const { registerAttestation } = useAttestation()
  const [error, setError] = useState<string | null>(null)
  const [isRegistering, setIsRegistering] = useState(false)
  const [txHashes, setTxHashes] = useState<string[]>([])
  const [registrationStatus, setRegistrationStatus] = useState<RegistrationStatus>({
    alice: { kyc: false, accreditation: false },
    bob: { kyc: false, accreditation: false },
  })

  const allRegistered =
    registrationStatus.alice.kyc &&
    registrationStatus.alice.accreditation &&
    registrationStatus.bob.kyc &&
    registrationStatus.bob.accreditation

  if (allRegistered && txHashes.length > 0) {
    onComplete()
  }

  const handleRegisterAll = async () => {
    if (!attestationUIDs.alice.kyc || !attestationUIDs.bob.kyc) {
      setError('Attestations not created yet')
      return
    }

    setError(null)
    setIsRegistering(true)
    const newTxHashes: string[] = []

    try {
      // Register Alice's KYC attestation
      if (attestationUIDs.alice.kyc) {
        const hash = await registerAttestation(
          deployedContracts,
          DEMO_INVESTORS.ALICE.address,
          CLAIM_TOPICS.KYC,
          attestationUIDs.alice.kyc
        )
        newTxHashes.push(hash)
        setRegistrationStatus((prev) => ({
          ...prev,
          alice: { ...prev.alice, kyc: true },
        }))
      }

      // Register Alice's Accreditation attestation
      if (attestationUIDs.alice.accreditation) {
        const hash = await registerAttestation(
          deployedContracts,
          DEMO_INVESTORS.ALICE.address,
          CLAIM_TOPICS.ACCREDITATION,
          attestationUIDs.alice.accreditation
        )
        newTxHashes.push(hash)
        setRegistrationStatus((prev) => ({
          ...prev,
          alice: { ...prev.alice, accreditation: true },
        }))
      }

      // Register Bob's KYC attestation
      if (attestationUIDs.bob.kyc) {
        const hash = await registerAttestation(
          deployedContracts,
          DEMO_INVESTORS.BOB.address,
          CLAIM_TOPICS.KYC,
          attestationUIDs.bob.kyc
        )
        newTxHashes.push(hash)
        setRegistrationStatus((prev) => ({
          ...prev,
          bob: { ...prev.bob, kyc: true },
        }))
      }

      // Register Bob's Accreditation attestation
      if (attestationUIDs.bob.accreditation) {
        const hash = await registerAttestation(
          deployedContracts,
          DEMO_INVESTORS.BOB.address,
          CLAIM_TOPICS.ACCREDITATION,
          attestationUIDs.bob.accreditation
        )
        newTxHashes.push(hash)
        setRegistrationStatus((prev) => ({
          ...prev,
          bob: { ...prev.bob, accreditation: true },
        }))
      }

      setTxHashes(newTxHashes)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed')
    } finally {
      setIsRegistering(false)
    }
  }

  const canRegister = attestationUIDs.alice.kyc && attestationUIDs.bob.kyc

  if (allRegistered) {
    return (
      <div className="flex flex-col gap-4">
        <div className="alert alert-success">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
          <span>All attestations registered on the bridge!</span>
        </div>

        <div className="overflow-x-auto">
          <table className="table table-sm bg-base-100">
            <thead>
              <tr>
                <th>Investor</th>
                <th>Topic</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Alice</td>
                <td>KYC (1)</td>
                <td><span className="badge badge-success badge-sm">Registered</span></td>
              </tr>
              <tr>
                <td>Alice</td>
                <td>Accreditation (7)</td>
                <td><span className="badge badge-success badge-sm">Registered</span></td>
              </tr>
              <tr>
                <td>Bob</td>
                <td>KYC (1)</td>
                <td><span className="badge badge-success badge-sm">Registered</span></td>
              </tr>
              <tr>
                <td>Bob</td>
                <td>Accreditation (7)</td>
                <td><span className="badge badge-success badge-sm">Registered</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        {txHashes.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-base-content/70">Transactions:</span>
            {txHashes.map((hash, i) => (
              <TxLink key={i} hash={hash} label={`Tx ${i + 1}`} />
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-base-content/70">
        Register the EAS attestations on the bridge verifier contract. This links the attestations
        to the investor identities so they can be verified.
      </p>

      {!canRegister && (
        <div className="alert alert-warning">
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
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
          <span>Please create attestations for Alice and Bob first (Step 5)</span>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <div className="bg-base-100 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Alice</h4>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-base-content/50">KYC:</span>
              {registrationStatus.alice.kyc ? (
                <span className="badge badge-success badge-xs">Registered</span>
              ) : attestationUIDs.alice.kyc ? (
                <span className="badge badge-ghost badge-xs">Ready</span>
              ) : (
                <span className="badge badge-warning badge-xs">No attestation</span>
              )}
            </div>
            <div className="flex justify-between">
              <span className="text-base-content/50">Accreditation:</span>
              {registrationStatus.alice.accreditation ? (
                <span className="badge badge-success badge-xs">Registered</span>
              ) : attestationUIDs.alice.accreditation ? (
                <span className="badge badge-ghost badge-xs">Ready</span>
              ) : (
                <span className="badge badge-warning badge-xs">No attestation</span>
              )}
            </div>
          </div>
        </div>

        <div className="bg-base-100 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Bob</h4>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-base-content/50">KYC:</span>
              {registrationStatus.bob.kyc ? (
                <span className="badge badge-success badge-xs">Registered</span>
              ) : attestationUIDs.bob.kyc ? (
                <span className="badge badge-ghost badge-xs">Ready</span>
              ) : (
                <span className="badge badge-warning badge-xs">No attestation</span>
              )}
            </div>
            <div className="flex justify-between">
              <span className="text-base-content/50">Accreditation:</span>
              {registrationStatus.bob.accreditation ? (
                <span className="badge badge-success badge-xs">Registered</span>
              ) : attestationUIDs.bob.accreditation ? (
                <span className="badge badge-ghost badge-xs">Ready</span>
              ) : (
                <span className="badge badge-warning badge-xs">No attestation</span>
              )}
            </div>
          </div>
        </div>
      </div>

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

      <button
        className="btn btn-primary"
        onClick={handleRegisterAll}
        disabled={isRegistering || !canRegister}
      >
        {isRegistering ? (
          <>
            <span className="loading loading-spinner loading-sm"></span>
            Registering...
          </>
        ) : (
          'Register All Attestations'
        )}
      </button>
    </div>
  )
}
