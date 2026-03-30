'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'
import { StepCard } from '@/components/demo/StepCard'
import { Step1Connect } from '@/components/demo/Step1Connect'
import { Step2Deploy } from '@/components/demo/Step2Deploy'
import { Step3Configure } from '@/components/demo/Step3Configure'
import { Step4KycProvider } from '@/components/demo/Step4KycProvider'
import { Step5Investors } from '@/components/demo/Step5Investors'
import { Step6Register } from '@/components/demo/Step6Register'
import { Step7Verify } from '@/components/demo/Step7Verify'
import { Step8Revoke } from '@/components/demo/Step8Revoke'
import { useDemoState } from '@/hooks/useDemoState'
import { SEPOLIA_CHAIN_ID } from '@/lib/constants'
import { SITE_EMOJI } from '@/utils/site'
import Link from 'next/link'

const STEPS = [
  { title: 'Connect Wallet', description: 'Connect to Sepolia via your wallet' },
  { title: 'Deploy Contracts', description: 'Deploy bridge contracts to Sepolia' },
  { title: 'Configure Bridge', description: 'Set up EAS, adapters, and schema mappings' },
  { title: 'Add KYC Provider', description: 'Register yourself as a trusted attester' },
  { title: 'Create Investor Scenarios', description: 'Create attestations for demo investors' },
  { title: 'Register Attestations', description: 'Link attestations to the bridge' },
  { title: 'Verify Investors', description: 'Check eligibility of each investor' },
  { title: 'Revocation Demo', description: 'Demonstrate compliance enforcement' },
]

export default function DemoPage() {
  const { isConnected, chainId } = useAccount()
  const {
    deployedContracts,
    schemaUID,
    attestationUIDs,
    isConfigured,
    kycProviderAdded,
    isHydrated,
    setDeployedContracts,
    setSchemaUID,
    setAttestationUIDs,
    setIsConfigured,
    setKycProviderAdded,
    resetDemo,
  } = useDemoState()

  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const isOnSepolia = chainId === SEPOLIA_CHAIN_ID

  // Determine current step based on completion
  const getCurrentStep = () => {
    if (!isConnected || !isOnSepolia) return 1
    if (!deployedContracts.verifier) return 2
    if (!isConfigured) return 3
    if (!kycProviderAdded) return 4
    if (!attestationUIDs.alice.kyc || !attestationUIDs.bob.kyc) return 5
    if (!completedSteps.includes(6)) return 6
    if (!completedSteps.includes(7)) return 7
    return 8
  }

  const currentStep = getCurrentStep()

  const markStepComplete = (step: number) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps((prev) => [...prev, step])
    }
  }

  const isStepCompleted = (step: number) => {
    switch (step) {
      case 1:
        return isConnected && isOnSepolia
      case 2:
        return !!deployedContracts.verifier
      case 3:
        return isConfigured
      case 4:
        return kycProviderAdded
      case 5:
        return !!(attestationUIDs.alice.kyc && attestationUIDs.bob.kyc)
      case 6:
        return completedSteps.includes(6)
      case 7:
        return completedSteps.includes(7)
      case 8:
        return completedSteps.includes(8)
      default:
        return false
    }
  }

  const isStepLocked = (step: number) => {
    if (step === 1) return false
    return !isStepCompleted(step - 1) && currentStep < step
  }

  if (!isHydrated) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <span>{SITE_EMOJI}</span>
              Tokenized Treasury Fund Demo
            </h1>
            <p className="text-base-content/70 mt-1">
              Walk through the complete EAS-ERC3643 Identity Bridge workflow
            </p>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={resetDemo}>
            Reset Demo
          </button>
        </div>

        {/* Progress indicator */}
        <div className="flex items-center gap-1 overflow-x-auto py-2">
          {STEPS.map((_, index) => (
            <div key={index} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  isStepCompleted(index + 1)
                    ? 'bg-success text-success-content'
                    : currentStep === index + 1
                    ? 'bg-primary text-primary-content'
                    : 'bg-base-300 text-base-content/50'
                }`}
              >
                {isStepCompleted(index + 1) ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={3}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                ) : (
                  index + 1
                )}
              </div>
              {index < STEPS.length - 1 && (
                <div
                  className={`w-8 h-0.5 ${
                    isStepCompleted(index + 1) ? 'bg-success' : 'bg-base-300'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-4">
        {/* Step 1: Connect Wallet */}
        <StepCard
          stepNumber={1}
          title={STEPS[0].title}
          description={STEPS[0].description}
          isActive={currentStep === 1}
          isCompleted={isStepCompleted(1)}
          isLocked={false}
        >
          <Step1Connect onComplete={() => markStepComplete(1)} />
        </StepCard>

        {/* Step 2: Deploy Contracts */}
        <StepCard
          stepNumber={2}
          title={STEPS[1].title}
          description={STEPS[1].description}
          isActive={currentStep === 2}
          isCompleted={isStepCompleted(2)}
          isLocked={isStepLocked(2)}
        >
          <Step2Deploy
            deployedContracts={deployedContracts}
            onDeploy={setDeployedContracts}
            onComplete={() => markStepComplete(2)}
          />
        </StepCard>

        {/* Step 3: Configure Bridge */}
        <StepCard
          stepNumber={3}
          title={STEPS[2].title}
          description={STEPS[2].description}
          isActive={currentStep === 3}
          isCompleted={isStepCompleted(3)}
          isLocked={isStepLocked(3)}
        >
          <Step3Configure
            deployedContracts={deployedContracts}
            schemaUID={schemaUID}
            onSchemaRegistered={setSchemaUID}
            onConfigured={() => setIsConfigured(true)}
            onComplete={() => markStepComplete(3)}
          />
        </StepCard>

        {/* Step 4: Add KYC Provider */}
        <StepCard
          stepNumber={4}
          title={STEPS[3].title}
          description={STEPS[3].description}
          isActive={currentStep === 4}
          isCompleted={isStepCompleted(4)}
          isLocked={isStepLocked(4)}
        >
          <Step4KycProvider
            deployedContracts={deployedContracts}
            isAdded={kycProviderAdded}
            onAdded={() => setKycProviderAdded(true)}
            onComplete={() => markStepComplete(4)}
          />
        </StepCard>

        {/* Step 5: Create Investor Scenarios */}
        <StepCard
          stepNumber={5}
          title={STEPS[4].title}
          description={STEPS[4].description}
          isActive={currentStep === 5}
          isCompleted={isStepCompleted(5)}
          isLocked={isStepLocked(5)}
        >
          <Step5Investors
            schemaUID={schemaUID}
            attestationUIDs={attestationUIDs}
            onAttestationCreated={setAttestationUIDs}
            onComplete={() => markStepComplete(5)}
          />
        </StepCard>

        {/* Step 6: Register Attestations */}
        <StepCard
          stepNumber={6}
          title={STEPS[5].title}
          description={STEPS[5].description}
          isActive={currentStep === 6}
          isCompleted={isStepCompleted(6)}
          isLocked={isStepLocked(6)}
        >
          <Step6Register
            deployedContracts={deployedContracts}
            attestationUIDs={attestationUIDs}
            onComplete={() => markStepComplete(6)}
          />
        </StepCard>

        {/* Step 7: Verify Investors */}
        <StepCard
          stepNumber={7}
          title={STEPS[6].title}
          description={STEPS[6].description}
          isActive={currentStep === 7}
          isCompleted={isStepCompleted(7)}
          isLocked={isStepLocked(7)}
        >
          <Step7Verify
            deployedContracts={deployedContracts}
            onComplete={() => markStepComplete(7)}
          />
        </StepCard>

        {/* Step 8: Revocation Demo */}
        <StepCard
          stepNumber={8}
          title={STEPS[7].title}
          description={STEPS[7].description}
          isActive={currentStep === 8}
          isCompleted={isStepCompleted(8)}
          isLocked={isStepLocked(8)}
        >
          <Step8Revoke
            deployedContracts={deployedContracts}
            schemaUID={schemaUID}
            attestationUIDs={attestationUIDs}
          />
        </StepCard>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center text-sm text-base-content/50">
        <p>
          Want to verify any address?{' '}
          <Link href="/explorer" className="link link-primary">
            Use the Explorer
          </Link>
        </p>
      </div>
    </div>
  )
}
