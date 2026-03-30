'use client'

import { SEPOLIA_ETHERSCAN } from '@/lib/constants'

interface TxLinkProps {
  hash: string
  label?: string
}

export function TxLink({ hash, label }: TxLinkProps) {
  const shortHash = `${hash.slice(0, 6)}...${hash.slice(-4)}`

  return (
    <a
      href={`${SEPOLIA_ETHERSCAN}/tx/${hash}`}
      target="_blank"
      rel="noopener noreferrer"
      className="link link-primary text-sm inline-flex items-center gap-1"
    >
      {label || shortHash}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-3 h-3"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
        />
      </svg>
    </a>
  )
}

interface AddressLinkProps {
  address: string
  label?: string
}

export function AddressLink({ address, label }: AddressLinkProps) {
  const shortAddress = `${address.slice(0, 6)}...${address.slice(-4)}`

  return (
    <a
      href={`${SEPOLIA_ETHERSCAN}/address/${address}`}
      target="_blank"
      rel="noopener noreferrer"
      className="link link-primary text-sm inline-flex items-center gap-1 font-mono"
    >
      {label || shortAddress}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-3 h-3"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
        />
      </svg>
    </a>
  )
}
