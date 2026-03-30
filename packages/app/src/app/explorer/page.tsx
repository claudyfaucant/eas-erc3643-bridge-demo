'use client'

import { useState, useEffect } from 'react'
import { usePublicClient } from 'wagmi'
import { isAddress } from 'viem'
import { easClaimVerifierABI, DeployedContracts } from '@/lib/contracts'
import { SEPOLIA_ETHERSCAN, STORAGE_KEYS } from '@/lib/constants'
import { SITE_EMOJI } from '@/utils/site'
import { AddressLink } from '@/components/demo/TxLink'
import Link from 'next/link'

export default function ExplorerPage() {
  const publicClient = usePublicClient()
  const [addressInput, setAddressInput] = useState('')
  const [verifierAddress, setVerifierAddress] = useState<`0x${string}` | null>(null)
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationResult, setVerificationResult] = useState<{
    address: string
    isVerified: boolean
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Load verifier address from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEYS.DEPLOYED_CONTRACTS)
      if (stored) {
        try {
          const contracts: DeployedContracts = JSON.parse(stored)
          if (contracts.verifier) {
            setVerifierAddress(contracts.verifier)
          }
        } catch {
          // Ignore parse errors
        }
      }
    }
  }, [])

  const handleVerify = async () => {
    setError(null)
    setVerificationResult(null)

    if (!addressInput) {
      setError('Please enter an address')
      return
    }

    if (!isAddress(addressInput)) {
      setError('Invalid Ethereum address')
      return
    }

    if (!verifierAddress) {
      setError('No verifier contract deployed. Please complete the demo first.')
      return
    }

    if (!publicClient) {
      setError('Wallet not connected')
      return
    }

    setIsVerifying(true)

    try {
      const result = await publicClient.readContract({
        address: verifierAddress,
        abi: easClaimVerifierABI,
        functionName: 'isVerified',
        args: [addressInput as `0x${string}`],
      })

      setVerificationResult({
        address: addressInput,
        isVerified: result as boolean,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Verification failed')
    } finally {
      setIsVerifying(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
          <span>{SITE_EMOJI}</span>
          Address Explorer
        </h1>
        <p className="text-base-content/70 mt-2">
          Check if any address is verified through the EAS-ERC3643 Identity Bridge
        </p>
      </div>

      {/* Verifier Info */}
      {verifierAddress ? (
        <div className="alert alert-info mb-6">
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
              d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
            />
          </svg>
          <div>
            <span className="text-sm">Using verifier contract: </span>
            <AddressLink address={verifierAddress} />
          </div>
        </div>
      ) : (
        <div className="alert alert-warning mb-6">
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
          <div>
            <span>No verifier contract found. </span>
            <Link href="/demo" className="link link-primary">
              Complete the demo
            </Link>
            <span> to deploy contracts first.</span>
          </div>
        </div>
      )}

      {/* Search Form */}
      <div className="card bg-base-200 shadow-md">
        <div className="card-body">
          <h2 className="card-title">Check Address Verification</h2>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Ethereum Address</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="0x..."
                className="input input-bordered flex-1 font-mono"
                value={addressInput}
                onChange={(e) => setAddressInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
              />
              <button
                className="btn btn-primary"
                onClick={handleVerify}
                disabled={isVerifying || !verifierAddress}
              >
                {isVerifying ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Checking...
                  </>
                ) : (
                  'Verify'
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="alert alert-error mt-4">
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

          {verificationResult && (
            <div className="mt-6">
              <div
                className={`card ${
                  verificationResult.isVerified ? 'bg-success/10' : 'bg-error/10'
                }`}
              >
                <div className="card-body items-center text-center">
                  {verificationResult.isVerified ? (
                    <>
                      <div className="text-success mb-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={3}
                          stroke="currentColor"
                          className="w-16 h-16"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-success">ELIGIBLE</h3>
                      <p className="text-sm text-base-content/70">
                        This address has valid EAS attestations and passes ERC-3643 verification.
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="text-error mb-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={3}
                          stroke="currentColor"
                          className="w-16 h-16"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-error">NOT ELIGIBLE</h3>
                      <p className="text-sm text-base-content/70">
                        This address does not have valid EAS attestations or fails ERC-3643 verification.
                      </p>
                    </>
                  )}

                  <div className="mt-4 text-sm">
                    <span className="text-base-content/50">Address: </span>
                    <AddressLink address={verificationResult.address} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Contract Links */}
      {verifierAddress && (
        <div className="mt-8">
          <h3 className="text-lg font-medium mb-4">Contract Links</h3>
          <div className="grid gap-2">
            <a
              href={`${SEPOLIA_ETHERSCAN}/address/${verifierAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-sm justify-start gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                />
              </svg>
              View EASClaimVerifier on Etherscan
            </a>
          </div>
        </div>
      )}

      {/* Back to Demo */}
      <div className="mt-8 text-center">
        <Link href="/demo" className="link link-primary">
          Back to Demo
        </Link>
      </div>
    </div>
  )
}
