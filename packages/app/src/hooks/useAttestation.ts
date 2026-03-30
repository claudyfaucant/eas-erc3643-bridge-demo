'use client'

import { useCallback, useState } from 'react'
import { useAccount, usePublicClient, useWalletClient } from 'wagmi'
import { encodeAbiParameters, parseAbiParameters, zeroHash } from 'viem'
import { easABI, easClaimVerifierABI, DeployedContracts } from '@/lib/contracts'
import { EAS_CONTRACT_ADDRESS, SEPOLIA_CHAIN_ID } from '@/lib/constants'

export interface InvestorData {
  address: `0x${string}`
  kycStatus: number
  accreditationType: number
  countryCode: number
}

export function useAttestation() {
  const { address, chainId } = useAccount()
  const publicClient = usePublicClient()
  const { data: walletClient } = useWalletClient()
  const [isCreating, setIsCreating] = useState(false)
  const [isRevoking, setIsRevoking] = useState(false)

  const createAttestation = useCallback(
    async (
      schemaUID: `0x${string}`,
      investor: InvestorData
    ): Promise<`0x${string}`> => {
      if (!walletClient || !publicClient || !address) {
        throw new Error('Wallet not connected')
      }

      if (chainId !== SEPOLIA_CHAIN_ID) {
        throw new Error('Please switch to Sepolia network')
      }

      setIsCreating(true)

      try {
        // Calculate expiration: 1 year from now
        const expirationTimestamp = BigInt(Math.floor(Date.now() / 1000) + 365 * 24 * 60 * 60)

        // Encode attestation data
        const encodedData = encodeAbiParameters(
          parseAbiParameters('address, uint8, uint8, uint16, uint64'),
          [
            investor.address,
            investor.kycStatus,
            investor.accreditationType,
            investor.countryCode,
            expirationTimestamp,
          ]
        )

        // Create attestation request
        const request = {
          schema: schemaUID,
          data: {
            recipient: investor.address,
            expirationTime: expirationTimestamp,
            revocable: true,
            refUID: zeroHash,
            data: encodedData,
            value: 0n,
          },
        }

        const hash = await walletClient.writeContract({
          address: EAS_CONTRACT_ADDRESS,
          abi: easABI,
          functionName: 'attest',
          args: [request],
          account: address,
        })

        const receipt = await publicClient.waitForTransactionReceipt({ hash })

        // Extract attestation UID from logs
        // The Attested event signature
        const attestedEvent = receipt.logs.find((log) => {
          try {
            return log.topics[0] === '0x8bf46bf4cfd674fa735a3d63ec1c9ad4153f033c290341f3a588b75685141b35'
          } catch {
            return false
          }
        })

        if (!attestedEvent) {
          // If we can't find the event, use tx hash as fallback
          return hash
        }

        // The UID is typically in topics[1] or in the data
        const uid = attestedEvent.topics[1] || hash
        return uid as `0x${string}`
      } finally {
        setIsCreating(false)
      }
    },
    [walletClient, publicClient, address, chainId]
  )

  const registerAttestation = useCallback(
    async (
      contracts: DeployedContracts,
      investorAddress: `0x${string}`,
      claimTopic: bigint,
      attestationUID: `0x${string}`
    ): Promise<string> => {
      if (!walletClient || !publicClient || !address) {
        throw new Error('Wallet not connected')
      }

      if (!contracts.verifier) {
        throw new Error('Verifier not deployed')
      }

      const hash = await walletClient.writeContract({
        address: contracts.verifier,
        abi: easClaimVerifierABI,
        functionName: 'registerAttestation',
        args: [investorAddress, claimTopic, attestationUID],
        account: address,
      })

      await publicClient.waitForTransactionReceipt({ hash })
      return hash
    },
    [walletClient, publicClient, address]
  )

  const revokeAttestation = useCallback(
    async (schemaUID: `0x${string}`, attestationUID: `0x${string}`): Promise<string> => {
      if (!walletClient || !publicClient || !address) {
        throw new Error('Wallet not connected')
      }

      if (chainId !== SEPOLIA_CHAIN_ID) {
        throw new Error('Please switch to Sepolia network')
      }

      setIsRevoking(true)

      try {
        const request = {
          schema: schemaUID,
          data: {
            uid: attestationUID,
            value: 0n,
          },
        }

        const hash = await walletClient.writeContract({
          address: EAS_CONTRACT_ADDRESS,
          abi: easABI,
          functionName: 'revoke',
          args: [request],
          account: address,
        })

        await publicClient.waitForTransactionReceipt({ hash })
        return hash
      } finally {
        setIsRevoking(false)
      }
    },
    [walletClient, publicClient, address, chainId]
  )

  const verifyInvestor = useCallback(
    async (contracts: DeployedContracts, investorAddress: `0x${string}`): Promise<boolean> => {
      if (!publicClient) {
        throw new Error('Public client not available')
      }

      if (!contracts.verifier) {
        throw new Error('Verifier not deployed')
      }

      const result = await publicClient.readContract({
        address: contracts.verifier,
        abi: easClaimVerifierABI,
        functionName: 'isVerified',
        args: [investorAddress],
      })

      return result as boolean
    },
    [publicClient]
  )

  return {
    createAttestation,
    registerAttestation,
    revokeAttestation,
    verifyInvestor,
    isCreating,
    isRevoking,
  }
}
