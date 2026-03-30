'use client'

import { useState, useCallback } from 'react'
import { useAttestation } from '@/hooks/useAttestation'
import { DeployedContracts, AttestationUIDs } from '@/lib/contracts'
import { DEMO_INVESTORS } from '@/lib/constants'
import { TxLink, AddressLink } from './TxLink'

interface Step8RevokeProps {
  deployedContracts: DeployedContracts
  schemaUID: `0x${string}` | null
  attestationUIDs: AttestationUIDs
}

export function Step8Revoke({
  deployedContracts,
  schemaUID,
  attestationUIDs,
}: Step8RevokeProps) {
  const { revokeAttestation, verifyInvestor, isRevoking } = useAttestation()
  const [error, setError] = useState<string | null>(null)
  const [revokeTxHash, setRevokeTxHash] = useState<string | null>(null)
  const [bobVerificationAfterRevoke, setBobVerificationAfterRevoke] = useState<boolean | null>(null)
  const [isRevoked, setIsRevoked] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)

  const handleRevokeBob = useCallback(async () => {
    if (!schemaUID || !attestationUIDs.bob.kyc) {
      setError('Schema or attestation not found')
      return
    }

    setError(null)

    try {
      const hash = await revokeAttestation(schemaUID, attestationUIDs.bob.kyc)
      setRevokeTxHash(hash)
      setIsRevoked(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Revocation failed')
    }
  }, [schemaUID, attestationUIDs.bob.kyc, revokeAttestation])

  const handleReVerifyBob = useCallback(async () => {
    setIsVerifying(true)
    setError(null)

    try {
      const result = await verifyInvestor(deployedContracts, DEMO_INVESTORS.BOB.address)
      setBobVerificationAfterRevoke(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Verification failed')
    } finally {
      setIsVerifying(false)
    }
  }, [verifyInvestor, deployedContracts])

  const canRevoke = schemaUID && attestationUIDs.bob.kyc

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-base-content/70">
        Demonstrate real-time compliance enforcement by revoking Bob&apos;s attestation. After
        revocation, Bob should no longer be eligible - proving that the bridge respects EAS
        revocation status.
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

      {/* Bob's status card */}
      <div
        className={`card bg-base-100 shadow-md border-2 ${
          isRevoked
            ? bobVerificationAfterRevoke === false
              ? 'border-error'
              : 'border-warning'
            : 'border-base-300'
        }`}
      >
        <div className="card-body p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="font-bold text-lg">Bob</h4>
              <p className="text-sm text-base-content/60">EU Professional Investor</p>
            </div>
            {isRevoked ? (
              bobVerificationAfterRevoke === false ? (
                <div className="flex items-center gap-2 text-error">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={3}
                    stroke="currentColor"
                    className="w-8 h-8"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="badge badge-error">NOT ELIGIBLE</span>
                </div>
              ) : (
                <span className="badge badge-warning">REVOKED (verify again)</span>
              )
            ) : (
              <span className="badge badge-success">ELIGIBLE</span>
            )}
          </div>

          <div className="space-y-2 text-sm mb-4">
            <div className="flex justify-between">
              <span className="text-base-content/50">Address:</span>
              <AddressLink address={DEMO_INVESTORS.BOB.address} />
            </div>
            {attestationUIDs.bob.kyc && (
              <div className="flex justify-between">
                <span className="text-base-content/50">KYC Attestation:</span>
                <span className={`font-mono text-xs ${isRevoked ? 'line-through text-error' : ''}`}>
                  {attestationUIDs.bob.kyc.slice(0, 10)}...
                </span>
              </div>
            )}
            {revokeTxHash && (
              <div className="flex justify-between">
                <span className="text-base-content/50">Revocation Tx:</span>
                <TxLink hash={revokeTxHash} />
              </div>
            )}
          </div>

          <div className="flex gap-2">
            {!isRevoked ? (
              <button
                className="btn btn-error flex-1"
                onClick={handleRevokeBob}
                disabled={isRevoking || !canRevoke}
              >
                {isRevoking ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Revoking...
                  </>
                ) : (
                  <>
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
                        d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                      />
                    </svg>
                    Revoke Bob&apos;s Attestation
                  </>
                )}
              </button>
            ) : bobVerificationAfterRevoke === null ? (
              <button
                className="btn btn-primary flex-1"
                onClick={handleReVerifyBob}
                disabled={isVerifying}
              >
                {isVerifying ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Verifying...
                  </>
                ) : (
                  <>
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
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Re-verify Bob
                  </>
                )}
              </button>
            ) : null}
          </div>
        </div>
      </div>

      {/* Success message after full demo */}
      {bobVerificationAfterRevoke === false && (
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
          <div>
            <h4 className="font-bold">Demo Complete!</h4>
            <p className="text-sm">
              Bob is now NOT ELIGIBLE after revocation. This demonstrates real-time compliance
              enforcement through the EAS-ERC3643 Identity Bridge.
            </p>
          </div>
        </div>
      )}

      {/* Explanation */}
      <div className="bg-base-100 p-4 rounded-lg text-sm">
        <h5 className="font-medium mb-2">How Revocation Works:</h5>
        <ol className="list-decimal list-inside space-y-1 text-base-content/70">
          <li>The EAS attestation is marked as revoked on-chain</li>
          <li>The bridge verifier checks attestation validity via EAS</li>
          <li>Revoked attestations fail the verification check</li>
          <li>The investor immediately loses eligibility</li>
        </ol>
      </div>
    </div>
  )
}
