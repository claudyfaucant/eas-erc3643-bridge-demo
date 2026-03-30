'use client'

import { useAccount, useBalance } from 'wagmi'
import { formatEther } from 'viem'
import { SEPOLIA_CHAIN_ID } from '@/lib/constants'

interface Step1ConnectProps {
  onComplete: () => void
}

export function Step1Connect({ onComplete }: Step1ConnectProps) {
  const { address, isConnected, chainId } = useAccount()
  const { data: balance } = useBalance({ address })

  const isOnSepolia = chainId === SEPOLIA_CHAIN_ID
  const isComplete = isConnected && isOnSepolia

  // Notify parent when complete
  if (isComplete && onComplete) {
    onComplete()
  }

  if (!isConnected) {
    return (
      <div className="flex flex-col gap-4">
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
          <span>Please connect your wallet using the button in the header.</span>
        </div>
      </div>
    )
  }

  if (!isOnSepolia) {
    return (
      <div className="flex flex-col gap-4">
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
          <span>Please switch to Sepolia testnet. Current chain ID: {chainId}</span>
        </div>
      </div>
    )
  }

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
        <span>Connected to Sepolia!</span>
      </div>

      <div className="stats stats-vertical lg:stats-horizontal shadow bg-base-100">
        <div className="stat">
          <div className="stat-title">Connected Address</div>
          <div className="stat-value text-sm font-mono">{`${address?.slice(0, 6)}...${address?.slice(-4)}`}</div>
        </div>

        <div className="stat">
          <div className="stat-title">Sepolia ETH Balance</div>
          <div className="stat-value text-lg">
            {balance ? `${parseFloat(formatEther(balance.value)).toFixed(4)} ETH` : '0 ETH'}
          </div>
          {balance && balance.value === 0n && (
            <div className="stat-desc text-warning">You may need Sepolia ETH for gas fees</div>
          )}
        </div>

        <div className="stat">
          <div className="stat-title">Network</div>
          <div className="stat-value text-lg flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
            Sepolia
          </div>
        </div>
      </div>
    </div>
  )
}
