'use client'

import { useCallback, useState } from 'react'
import { useAccount, usePublicClient, useWalletClient } from 'wagmi'
import {
  easClaimVerifierABI,
  easTrustedIssuersAdapterABI,
  DeployedContracts,
} from '@/lib/contracts'
import {
  EAS_CONTRACT_ADDRESS,
  SEPOLIA_CHAIN_ID,
  CLAIM_TOPICS,
  INVESTOR_SCHEMA,
  SCHEMA_REGISTRY_ADDRESS,
} from '@/lib/constants'
import { schemaRegistryABI } from '@/lib/contracts'

export function useBridgeConfig() {
  const { address, chainId } = useAccount()
  const publicClient = usePublicClient()
  const { data: walletClient } = useWalletClient()
  const [isConfiguring, setIsConfiguring] = useState(false)
  const [configProgress, setConfigProgress] = useState<string[]>([])

  const registerSchema = useCallback(async (): Promise<`0x${string}`> => {
    if (!walletClient || !publicClient || !address) {
      throw new Error('Wallet not connected')
    }

    if (chainId !== SEPOLIA_CHAIN_ID) {
      throw new Error('Please switch to Sepolia network')
    }

    setConfigProgress((prev) => [...prev, 'Registering schema on EAS SchemaRegistry...'])

    const hash = await walletClient.writeContract({
      address: SCHEMA_REGISTRY_ADDRESS,
      abi: schemaRegistryABI,
      functionName: 'register',
      args: [
        INVESTOR_SCHEMA,
        '0x0000000000000000000000000000000000000000', // No resolver
        true, // revocable
      ],
      account: address,
    })

    const receipt = await publicClient.waitForTransactionReceipt({ hash })

    // Extract schema UID from logs
    const registeredEvent = receipt.logs.find((log) => {
      try {
        return log.topics[0] === '0x7d917fcbc9a29a9705ff9936ffa599500e4f616a16e6ba92fde21e13d699e04e'
      } catch {
        return false
      }
    })

    if (!registeredEvent || !registeredEvent.topics[1]) {
      throw new Error('Schema registration failed - no UID in logs')
    }

    const schemaUID = registeredEvent.topics[1] as `0x${string}`
    setConfigProgress((prev) => [...prev, `Schema registered with UID: ${schemaUID.slice(0, 10)}...`])

    return schemaUID
  }, [walletClient, publicClient, address, chainId])

  const configureAll = useCallback(
    async (
      contracts: DeployedContracts,
      schemaUID: `0x${string}`
    ): Promise<string[]> => {
      if (!walletClient || !publicClient || !address) {
        throw new Error('Wallet not connected')
      }

      if (chainId !== SEPOLIA_CHAIN_ID) {
        throw new Error('Please switch to Sepolia network')
      }

      if (!contracts.verifier || !contracts.adapter || !contracts.proxy || !contracts.registry) {
        throw new Error('Contracts not deployed')
      }

      setIsConfiguring(true)
      setConfigProgress([])
      const txHashes: string[] = []

      try {
        // 1. Set EAS address on verifier
        setConfigProgress((prev) => [...prev, 'Setting EAS address on verifier...'])
        const setEASHash = await walletClient.writeContract({
          address: contracts.verifier,
          abi: easClaimVerifierABI,
          functionName: 'setEASAddress',
          args: [EAS_CONTRACT_ADDRESS],
          account: address,
        })
        await publicClient.waitForTransactionReceipt({ hash: setEASHash })
        txHashes.push(setEASHash)
        setConfigProgress((prev) => [...prev, `EAS address set (tx: ${setEASHash.slice(0, 10)}...)`])

        // 2. Set Trusted Issuers Adapter on verifier
        setConfigProgress((prev) => [...prev, 'Setting Trusted Issuers Adapter...'])
        const setAdapterHash = await walletClient.writeContract({
          address: contracts.verifier,
          abi: easClaimVerifierABI,
          functionName: 'setTrustedIssuersAdapter',
          args: [contracts.adapter],
          account: address,
        })
        await publicClient.waitForTransactionReceipt({ hash: setAdapterHash })
        txHashes.push(setAdapterHash)
        setConfigProgress((prev) => [
          ...prev,
          `Adapter set (tx: ${setAdapterHash.slice(0, 10)}...)`,
        ])

        // 3. Set Identity Proxy on verifier
        setConfigProgress((prev) => [...prev, 'Setting Identity Proxy...'])
        const setProxyHash = await walletClient.writeContract({
          address: contracts.verifier,
          abi: easClaimVerifierABI,
          functionName: 'setIdentityProxy',
          args: [contracts.proxy],
          account: address,
        })
        await publicClient.waitForTransactionReceipt({ hash: setProxyHash })
        txHashes.push(setProxyHash)
        setConfigProgress((prev) => [...prev, `Proxy set (tx: ${setProxyHash.slice(0, 10)}...)`])

        // 4. Set Claim Topics Registry on verifier
        setConfigProgress((prev) => [...prev, 'Setting Claim Topics Registry...'])
        const setRegistryHash = await walletClient.writeContract({
          address: contracts.verifier,
          abi: easClaimVerifierABI,
          functionName: 'setClaimTopicsRegistry',
          args: [contracts.registry],
          account: address,
        })
        await publicClient.waitForTransactionReceipt({ hash: setRegistryHash })
        txHashes.push(setRegistryHash)
        setConfigProgress((prev) => [
          ...prev,
          `Registry set (tx: ${setRegistryHash.slice(0, 10)}...)`,
        ])

        // 5. Map KYC topic (1) to schema
        setConfigProgress((prev) => [...prev, 'Mapping KYC topic to schema...'])
        const mapKycHash = await walletClient.writeContract({
          address: contracts.verifier,
          abi: easClaimVerifierABI,
          functionName: 'setTopicSchemaMapping',
          args: [CLAIM_TOPICS.KYC, schemaUID],
          account: address,
        })
        await publicClient.waitForTransactionReceipt({ hash: mapKycHash })
        txHashes.push(mapKycHash)
        setConfigProgress((prev) => [...prev, `KYC topic mapped (tx: ${mapKycHash.slice(0, 10)}...)`])

        // 6. Map Accreditation topic (7) to schema
        setConfigProgress((prev) => [...prev, 'Mapping Accreditation topic to schema...'])
        const mapAccredHash = await walletClient.writeContract({
          address: contracts.verifier,
          abi: easClaimVerifierABI,
          functionName: 'setTopicSchemaMapping',
          args: [CLAIM_TOPICS.ACCREDITATION, schemaUID],
          account: address,
        })
        await publicClient.waitForTransactionReceipt({ hash: mapAccredHash })
        txHashes.push(mapAccredHash)
        setConfigProgress((prev) => [
          ...prev,
          `Accreditation topic mapped (tx: ${mapAccredHash.slice(0, 10)}...)`,
        ])

        setConfigProgress((prev) => [...prev, 'Configuration complete!'])
        return txHashes
      } finally {
        setIsConfiguring(false)
      }
    },
    [walletClient, publicClient, address, chainId]
  )

  const addKycProvider = useCallback(
    async (contracts: DeployedContracts): Promise<string> => {
      if (!walletClient || !publicClient || !address) {
        throw new Error('Wallet not connected')
      }

      if (!contracts.adapter) {
        throw new Error('Adapter not deployed')
      }

      setConfigProgress((prev) => [...prev, 'Adding connected wallet as trusted attester...'])

      const hash = await walletClient.writeContract({
        address: contracts.adapter,
        abi: easTrustedIssuersAdapterABI,
        functionName: 'addTrustedAttester',
        args: [address, [CLAIM_TOPICS.KYC, CLAIM_TOPICS.ACCREDITATION]],
        account: address,
      })

      await publicClient.waitForTransactionReceipt({ hash })
      setConfigProgress((prev) => [
        ...prev,
        `Added ${address.slice(0, 6)}...${address.slice(-4)} as trusted attester`,
      ])

      return hash
    },
    [walletClient, publicClient, address]
  )

  return {
    registerSchema,
    configureAll,
    addKycProvider,
    isConfiguring,
    configProgress,
    setConfigProgress,
  }
}
