'use client'

import { useState } from 'react'
import { useBridgeConfig } from '@/hooks/useBridgeConfig'
import { DeployedContracts } from '@/lib/contracts'
import { TxLink } from './TxLink'

interface Step3ConfigureProps {
  deployedContracts: DeployedContracts
  schemaUID: `0x${string}` | null
  onSchemaRegistered: (uid: `0x${string}`) => void
  onConfigured: (txHashes: string[]) => void
  onComplete: () => void
}

export function Step3Configure({
  deployedContracts,
  schemaUID,
  onSchemaRegistered,
  onConfigured,
  onComplete,
}: Step3ConfigureProps) {
  const { registerSchema, configureAll, isConfiguring, configProgress, setConfigProgress } =
    useBridgeConfig()
  const [error, setError] = useState<string | null>(null)
  const [configTxHashes, setConfigTxHashes] = useState<string[]>([])
  const [isConfigured, setIsConfigured] = useState(false)

  const handleConfigureAll = async () => {
    setError(null)
    setConfigProgress([])

    try {
      // First register schema if not already done
      let currentSchemaUID = schemaUID
      if (!currentSchemaUID) {
        currentSchemaUID = await registerSchema()
        onSchemaRegistered(currentSchemaUID)
      }

      // Then configure all contracts
      const txHashes = await configureAll(deployedContracts, currentSchemaUID)
      setConfigTxHashes(txHashes)
      onConfigured(txHashes)
      setIsConfigured(true)
      onComplete()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Configuration failed')
    }
  }

  if (isConfigured || (schemaUID && configTxHashes.length > 0)) {
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
          <span>Bridge configured successfully!</span>
        </div>

        {schemaUID && (
          <div className="bg-base-100 p-4 rounded-lg">
            <p className="text-sm font-medium mb-2">Schema UID:</p>
            <p className="font-mono text-xs break-all text-base-content/70">{schemaUID}</p>
          </div>
        )}

        {configTxHashes.length > 0 && (
          <div className="bg-base-100 p-4 rounded-lg">
            <p className="text-sm font-medium mb-2">Configuration Transactions:</p>
            <div className="flex flex-wrap gap-2">
              {configTxHashes.map((hash, i) => (
                <TxLink key={i} hash={hash} label={`Tx ${i + 1}`} />
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-base-content/70">
        Configure the bridge by setting up the EAS address, adapters, and schema mappings.
        This will:
      </p>

      <ul className="list-disc list-inside text-sm space-y-1 text-base-content/70">
        <li>Register a new schema on EAS SchemaRegistry</li>
        <li>Set EAS contract address on verifier</li>
        <li>Connect the Trusted Issuers Adapter</li>
        <li>Connect the Identity Proxy</li>
        <li>Connect the Claim Topics Registry</li>
        <li>Map KYC topic (1) to schema</li>
        <li>Map Accreditation topic (7) to schema</li>
      </ul>

      {configProgress.length > 0 && (
        <div className="bg-base-100 p-4 rounded-lg max-h-48 overflow-y-auto">
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
        onClick={handleConfigureAll}
        disabled={isConfiguring}
      >
        {isConfiguring ? (
          <>
            <span className="loading loading-spinner loading-sm"></span>
            Configuring...
          </>
        ) : (
          'Configure All'
        )}
      </button>
    </div>
  )
}
