'use client'

import { useState, useEffect, useCallback } from 'react'
import { STORAGE_KEYS } from '@/lib/constants'
import { DeployedContracts, AttestationUIDs } from '@/lib/contracts'

export interface DemoState {
  currentStep: number
  deployedContracts: DeployedContracts
  schemaUID: `0x${string}` | null
  attestationUIDs: AttestationUIDs
  configTxHashes: string[]
  isConfigured: boolean
  kycProviderAdded: boolean
}

const initialDeployedContracts: DeployedContracts = {
  verifier: null,
  adapter: null,
  proxy: null,
  registry: null,
}

const initialAttestationUIDs: AttestationUIDs = {
  alice: { kyc: null, accreditation: null },
  bob: { kyc: null, accreditation: null },
}

const initialState: DemoState = {
  currentStep: 1,
  deployedContracts: initialDeployedContracts,
  schemaUID: null,
  attestationUIDs: initialAttestationUIDs,
  configTxHashes: [],
  isConfigured: false,
  kycProviderAdded: false,
}

export function useDemoState() {
  const [state, setState] = useState<DemoState>(initialState)
  const [isHydrated, setIsHydrated] = useState(false)

  // Load state from localStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return

    const loadedContracts = localStorage.getItem(STORAGE_KEYS.DEPLOYED_CONTRACTS)
    const loadedSchemaUID = localStorage.getItem(STORAGE_KEYS.SCHEMA_UID)
    const loadedAttestations = localStorage.getItem(STORAGE_KEYS.ATTESTATION_UIDS)

    setState((prev) => ({
      ...prev,
      deployedContracts: loadedContracts ? JSON.parse(loadedContracts) : initialDeployedContracts,
      schemaUID: loadedSchemaUID ? (loadedSchemaUID as `0x${string}`) : null,
      attestationUIDs: loadedAttestations ? JSON.parse(loadedAttestations) : initialAttestationUIDs,
    }))
    setIsHydrated(true)
  }, [])

  // Persist contracts to localStorage
  const setDeployedContracts = useCallback((contracts: DeployedContracts) => {
    setState((prev) => ({ ...prev, deployedContracts: contracts }))
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.DEPLOYED_CONTRACTS, JSON.stringify(contracts))
    }
  }, [])

  // Persist schema UID to localStorage
  const setSchemaUID = useCallback((uid: `0x${string}`) => {
    setState((prev) => ({ ...prev, schemaUID: uid }))
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.SCHEMA_UID, uid)
    }
  }, [])

  // Persist attestation UIDs to localStorage
  const setAttestationUIDs = useCallback((uids: AttestationUIDs) => {
    setState((prev) => ({ ...prev, attestationUIDs: uids }))
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.ATTESTATION_UIDS, JSON.stringify(uids))
    }
  }, [])

  const setCurrentStep = useCallback((step: number) => {
    setState((prev) => ({ ...prev, currentStep: step }))
  }, [])

  const setConfigTxHashes = useCallback((hashes: string[]) => {
    setState((prev) => ({ ...prev, configTxHashes: hashes }))
  }, [])

  const setIsConfigured = useCallback((configured: boolean) => {
    setState((prev) => ({ ...prev, isConfigured: configured }))
  }, [])

  const setKycProviderAdded = useCallback((added: boolean) => {
    setState((prev) => ({ ...prev, kycProviderAdded: added }))
  }, [])

  // Check if contracts are deployed
  const areContractsDeployed = useCallback(() => {
    const { deployedContracts } = state
    return !!(
      deployedContracts.verifier &&
      deployedContracts.adapter &&
      deployedContracts.proxy &&
      deployedContracts.registry
    )
  }, [state])

  // Reset all state
  const resetDemo = useCallback(() => {
    setState(initialState)
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEYS.DEPLOYED_CONTRACTS)
      localStorage.removeItem(STORAGE_KEYS.SCHEMA_UID)
      localStorage.removeItem(STORAGE_KEYS.ATTESTATION_UIDS)
    }
  }, [])

  return {
    ...state,
    isHydrated,
    setDeployedContracts,
    setSchemaUID,
    setAttestationUIDs,
    setCurrentStep,
    setConfigTxHashes,
    setIsConfigured,
    setKycProviderAdded,
    areContractsDeployed,
    resetDemo,
  }
}
