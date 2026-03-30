'use client'

import { useState } from 'react'
import { useContractDeploy } from '@/hooks/useContractDeploy'
import { DeployedContracts } from '@/lib/contracts'
import { AddressLink } from './TxLink'

interface Step2DeployProps {
  deployedContracts: DeployedContracts
  onDeploy: (contracts: DeployedContracts) => void
  onComplete: () => void
}

export function Step2Deploy({ deployedContracts, onDeploy, onComplete }: Step2DeployProps) {
  const { deployAllContracts, isDeploying, deployProgress } = useContractDeploy()
  const [error, setError] = useState<string | null>(null)
  const [, setDeployTxHashes] = useState<string[]>([])

  const hasDeployedContracts =
    deployedContracts.verifier &&
    deployedContracts.adapter &&
    deployedContracts.proxy &&
    deployedContracts.registry

  const handleDeploy = async () => {
    setError(null)
    try {
      const { contracts, txHashes } = await deployAllContracts()
      onDeploy(contracts)
      setDeployTxHashes(txHashes)
      onComplete()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Deployment failed')
    }
  }

  const handleRedeploy = () => {
    // Clear existing contracts and redeploy
    onDeploy({
      verifier: null,
      adapter: null,
      proxy: null,
      registry: null,
    })
    setDeployTxHashes([])
    handleDeploy()
  }

  if (hasDeployedContracts) {
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
          <span>Contracts already deployed!</span>
        </div>

        <div className="overflow-x-auto">
          <table className="table table-sm bg-base-100">
            <thead>
              <tr>
                <th>Contract</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-medium">EASClaimVerifier</td>
                <td>
                  <AddressLink address={deployedContracts.verifier!} />
                </td>
              </tr>
              <tr>
                <td className="font-medium">EASTrustedIssuersAdapter</td>
                <td>
                  <AddressLink address={deployedContracts.adapter!} />
                </td>
              </tr>
              <tr>
                <td className="font-medium">EASIdentityProxy</td>
                <td>
                  <AddressLink address={deployedContracts.proxy!} />
                </td>
              </tr>
              <tr>
                <td className="font-medium">MockClaimTopicsRegistry</td>
                <td>
                  <AddressLink address={deployedContracts.registry!} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex gap-2">
          <button className="btn btn-outline btn-sm" onClick={handleRedeploy}>
            Redeploy Contracts
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-base-content/70">
        Deploy the bridge contracts to Sepolia. This will deploy:
      </p>

      <ul className="list-disc list-inside text-sm space-y-1 text-base-content/70">
        <li>
          <strong>EASClaimVerifier</strong> - Main verification logic
        </li>
        <li>
          <strong>EASTrustedIssuersAdapter</strong> - Manages trusted attesters
        </li>
        <li>
          <strong>EASIdentityProxy</strong> - Maps wallets to identities
        </li>
        <li>
          <strong>MockClaimTopicsRegistry</strong> - Tracks required claim topics
        </li>
      </ul>

      {deployProgress.length > 0 && (
        <div className="bg-base-100 p-4 rounded-lg">
          <div className="text-sm font-mono space-y-1">
            {deployProgress.map((msg, i) => (
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
        onClick={handleDeploy}
        disabled={isDeploying}
      >
        {isDeploying ? (
          <>
            <span className="loading loading-spinner loading-sm"></span>
            Deploying...
          </>
        ) : (
          'Deploy All Contracts'
        )}
      </button>
    </div>
  )
}
