'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'
import { useBridgeConfig } from '@/hooks/useBridgeConfig'
import { DeployedContracts } from '@/lib/contracts'
import { TxLink, AddressLink } from './TxLink'

interface Step4KycProviderProps {
  deployedContracts: DeployedContracts
  isAdded: boolean
  onAdded: () => void
  onComplete: () => void
}

export function Step4KycProvider({
  deployedContracts,
  isAdded,
  onAdded,
  onComplete,
}: Step4KycProviderProps) {
  const { address } = useAccount()
  const { addKycProvider, configProgress, setConfigProgress } = useBridgeConfig()
  const [error, setError] = useState<string | null>(null)
  const [txHash, setTxHash] = useState<string | null>(null)
  const [isAdding, setIsAdding] = useState(false)

  const handleAddProvider = async () => {
    setError(null)
    setConfigProgress([])
    setIsAdding(true)

    try {
      const hash = await addKycProvider(deployedContracts)
      setTxHash(hash)
      onAdded()
      onComplete()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add KYC provider')
    } finally {
      setIsAdding(false)
    }
  }

  if (isAdded || txHash) {
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
          <span>KYC provider added successfully!</span>
        </div>

        <div className="bg-base-100 p-4 rounded-lg space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Trusted Attester:</span>
            {address && <AddressLink address={address} />}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Authorized Topics:</span>
            <span className="text-sm text-base-content/70">KYC (1), Accreditation (7)</span>
          </div>
          {txHash && (
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Transaction:</span>
              <TxLink hash={txHash} />
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-base-content/70">
        Add your connected wallet as a trusted KYC/Accreditation provider. This allows you to create
        attestations that the bridge will recognize.
      </p>

      <div className="bg-base-100 p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Your Address:</span>
          {address && <AddressLink address={address} />}
        </div>
        <div className="mt-2 text-sm text-base-content/60">
          Will be authorized for topics: KYC (1) and Accreditation (7)
        </div>
      </div>

      {configProgress.length > 0 && (
        <div className="bg-base-100 p-4 rounded-lg">
          <div className="text-sm font-mono space-y-1">
            {configProgress.map((msg, i) => (
              <div key={i} className="text-base-content/70">
                {msg}
              </div>
            ))}
          </div>
        </div>
      )}

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
        onClick={handleAddProvider}
        disabled={isAdding}
      >
        {isAdding ? (
          <>
            <span className="loading loading-spinner loading-sm"></span>
            Adding Provider...
          </>
        ) : (
          'Add as Trusted Attester'
        )}
      </button>
    </div>
  )
}
