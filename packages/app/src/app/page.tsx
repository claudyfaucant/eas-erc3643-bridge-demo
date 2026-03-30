import Link from 'next/link'
import { SITE_EMOJI } from '@/utils/site'

export default function Home() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto px-4">
        <div className="text-6xl mb-6">{SITE_EMOJI}</div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
          EAS-ERC3643 Identity Bridge
        </h1>
        <p className="text-xl text-base-content/70 mb-2">Live Demo</p>

        <p className="text-lg text-base-content/80 mb-8 max-w-2xl mx-auto">
          Bridge EAS (Ethereum Attestation Service) attestations to ERC-3643 compliant security tokens.
          Deploy contracts, create KYC/accreditation attestations, and verify investor eligibility — all on Sepolia testnet.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link href="/demo" className="btn btn-primary btn-lg gap-2">
            Start Demo
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
          <Link href="/explorer" className="btn btn-outline btn-lg">
            Address Explorer
          </Link>
        </div>
      </div>

      {/* Features Grid */}
      <div className="w-full max-w-4xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard
            icon="🔐"
            title="Deploy Contracts"
            description="Deploy EASClaimVerifier, TrustedIssuersAdapter, IdentityProxy, and ClaimTopicsRegistry"
          />
          <FeatureCard
            icon="📜"
            title="Create Attestations"
            description="Issue KYC and accreditation attestations for investors using EAS"
          />
          <FeatureCard
            icon="✅"
            title="Verify Compliance"
            description="Check investor eligibility in real-time with ERC-3643 compatible verification"
          />
        </div>
      </div>

      {/* Tech Stack */}
      <div className="mt-16 text-center">
        <p className="text-sm text-base-content/50 mb-4">Built with</p>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-base-content/70">
          <span className="badge badge-outline">Next.js 15</span>
          <span className="badge badge-outline">Wagmi</span>
          <span className="badge badge-outline">Viem</span>
          <span className="badge badge-outline">EAS SDK</span>
          <span className="badge badge-outline">Sepolia Testnet</span>
        </div>
      </div>

      {/* EEA Branding */}
      <div className="mt-12 text-center opacity-70">
        <p className="text-sm flex items-center justify-center gap-2">
          <span className="text-xl">{SITE_EMOJI}</span>
          <span>Enterprise Ethereum Alliance</span>
        </p>
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="card bg-base-200 shadow-md">
      <div className="card-body items-center text-center">
        <span className="text-3xl mb-2">{icon}</span>
        <h3 className="card-title text-lg">{title}</h3>
        <p className="text-sm text-base-content/70">{description}</p>
      </div>
    </div>
  )
}
