'use client'

import React from 'react'
import Link from 'next/link'

export default function StandardsPage() {
  return (
    <div className='min-h-screen bg-[#0f172a] text-white'>
      {/* Hero Section */}
      <section className='hero-gradient py-16 px-4'>
        <div className='max-w-4xl mx-auto text-center'>
          <h1 className='text-4xl md:text-5xl font-bold mb-6'>
            <span className='gradient-text'>How EAS Supports</span>
            <br />
            <span className='text-white'>Tokenized Asset Standards</span>
          </h1>
          <p className='text-xl text-slate-400 max-w-2xl mx-auto'>
            Understanding the role of Ethereum Attestation Service in ERC-3643 and ERC-7943 ecosystems
          </p>
        </div>
      </section>

      {/* What is EAS */}
      <section className='py-16 px-4'>
        <div className='max-w-4xl mx-auto'>
          <h2 className='text-3xl font-bold mb-6 gradient-text'>What is EAS?</h2>
          <div className='bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 mb-8'>
            <p className='text-slate-300 text-lg leading-relaxed'>
              <a
                href='https://github.com/ethereum-attestation-service/eas-contracts'
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-400 hover:text-blue-300 underline'
              >
                EAS (Ethereum Attestation Service)
              </a>{' '}
              lets anyone register a{' '}
              <a
                href='https://docs.attest.org/docs/core--concepts/schemas'
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-400 hover:text-blue-300 underline'
              >
                schema
              </a>
              , issue attestations against that schema, attach resolver logic to enforce validation rules,{' '}
              <a
                href='https://docs.attest.org/docs/core--concepts/revocation'
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-400 hover:text-blue-300 underline'
              >
                revoke attestations
              </a>
              , and reference prior attestations. It&apos;s a portable credential layer — but not by itself a full
              permissioning or transfer-control standard.
            </p>
          </div>
        </div>
      </section>

      {/* The Three Layers */}
      <section className='py-16 px-4 bg-slate-900/30'>
        <div className='max-w-6xl mx-auto'>
          <h2 className='text-3xl font-bold mb-12 text-center gradient-text'>The Three Layers</h2>
          <div className='grid md:grid-cols-3 gap-6'>
            {/* EAS Card */}
            <div className='bg-slate-800/50 border-l-4 border-blue-500 rounded-lg p-6 card-hover'>
              <div className='text-4xl mb-4'>🔷</div>
              <h3 className='text-xl font-bold mb-3 text-blue-400'>EAS</h3>
              <p className='text-slate-300'>Portable claims / credentials layer</p>
            </div>

            {/* ERC-3643 Card */}
            <div className='bg-slate-800/50 border-l-4 border-purple-500 rounded-lg p-6 card-hover'>
              <div className='text-4xl mb-4'>🔐</div>
              <h3 className='text-xl font-bold mb-3 text-purple-400'>ERC-3643</h3>
              <p className='text-slate-300'>
                Regulated token stack with built-in identity and compliance architecture
              </p>
            </div>

            {/* ERC-7943 Card */}
            <div className='bg-slate-800/50 border-l-4 border-green-500 rounded-lg p-6 card-hover'>
              <div className='text-4xl mb-4'>⚡</div>
              <h3 className='text-xl font-bold mb-3 text-green-400'>ERC-7943</h3>
              <p className='text-slate-300'>
                Minimal RWA control interface for checking permission, freezing, and forced transfer
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: EAS + ERC-3643 */}
      <section className='py-16 px-4'>
        <div className='max-w-4xl mx-auto'>
          <h2 className='text-3xl font-bold mb-8 gradient-text'>1. How EAS Fits ERC-3643</h2>

          <div className='mb-8'>
            <p className='text-slate-300 text-lg mb-6'>
              <a
                href='https://github.com/ERC-3643/ERC-3643'
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-400 hover:text-blue-300 underline'
              >
                ERC-3643&apos;s
              </a>{' '}
              reference stack includes ONCHAINID, Trusted Issuers Registry, Claim Topics Registry, Identity Registry,
              and a Compliance contract. EAS works as an <strong>input credential source</strong> — not a replacement
              for the whole 3643 architecture.
            </p>
          </div>

          {/* Flow Diagram */}
          <div className='bg-slate-800/30 border border-slate-700/50 rounded-lg p-8 mb-8'>
            <div className='flex flex-col items-center space-y-4'>
              {/* Step 1 */}
              <div className='bg-blue-900/30 border border-blue-500/50 rounded-lg p-4 w-full max-w-md text-center'>
                <div className='font-semibold text-blue-300'>KYC Provider</div>
              </div>

              {/* Arrow */}
              <div className='flex flex-col items-center'>
                <div className='w-0.5 h-8 bg-gradient-to-b from-blue-500 to-purple-500'></div>
                <div className='text-blue-400'>↓</div>
              </div>

              {/* Step 2 */}
              <div className='bg-blue-900/30 border border-blue-500/50 rounded-lg p-4 w-full max-w-md text-center'>
                <div className='font-semibold text-blue-300'>EAS Attestation</div>
                <div className='text-sm text-slate-400 mt-1'>(under standard KYC schema)</div>
              </div>

              {/* Arrow */}
              <div className='flex flex-col items-center'>
                <div className='w-0.5 h-8 bg-gradient-to-b from-blue-500 to-purple-500'></div>
                <div className='text-purple-400'>↓</div>
              </div>

              {/* Step 3 */}
              <div className='bg-purple-900/30 border border-purple-500/50 rounded-lg p-4 w-full max-w-md text-center'>
                <div className='font-semibold text-purple-300'>Bridge / Adapter</div>
                <div className='text-sm text-slate-400 mt-1'>Verifies attestation</div>
              </div>

              {/* Arrow */}
              <div className='flex flex-col items-center'>
                <div className='w-0.5 h-8 bg-gradient-to-b from-purple-500 to-purple-600'></div>
                <div className='text-purple-400'>↓</div>
              </div>

              {/* Step 4 */}
              <div className='bg-purple-900/30 border border-purple-500/50 rounded-lg p-4 w-full max-w-md text-center'>
                <div className='font-semibold text-purple-300'>Populate ONCHAINID Claims</div>
                <div className='text-sm text-slate-400 mt-1'>& Identity Registry</div>
              </div>

              {/* Arrow */}
              <div className='flex flex-col items-center'>
                <div className='w-0.5 h-8 bg-gradient-to-b from-purple-500 to-green-500'></div>
                <div className='text-green-400'>↓</div>
              </div>

              {/* Step 5 */}
              <div className='bg-green-900/30 border border-green-500/50 rounded-lg p-4 w-full max-w-md text-center'>
                <div className='font-semibold text-green-300'>ERC-3643 Token + Compliance Stack</div>
                <div className='text-sm text-slate-400 mt-1'>Enforces transfer rules</div>
              </div>
            </div>
          </div>

          {/* Explanation */}
          <div className='space-y-4 mb-8'>
            <div className='flex gap-3'>
              <span className='text-blue-400 mt-1'>•</span>
              <p className='text-slate-300'>
                Issuer defines an EAS schema for KYC status, accredited status, jurisdiction, expiry, sanctions
                screening, entity type
              </p>
            </div>
            <div className='flex gap-3'>
              <span className='text-blue-400 mt-1'>•</span>
              <p className='text-slate-300'>Trusted KYC/KYB providers issue attestations under that schema</p>
            </div>
            <div className='flex gap-3'>
              <span className='text-blue-400 mt-1'>•</span>
              <p className='text-slate-300'>
                A bridge contract maps attestations into ERC-3643 structures: claim topics, trusted issuers, identity
                status
              </p>
            </div>
            <div className='flex gap-3'>
              <span className='text-blue-400 mt-1'>•</span>
              <p className='text-slate-300'>
                Revocation and expiry sync back into ERC-3643 identity state (EAS supports{' '}
                <a
                  href='https://docs.attest.org/docs/core--concepts/revocation'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-blue-400 hover:text-blue-300 underline'
                >
                  revocation
                </a>{' '}
                natively)
              </p>
            </div>
          </div>

          {/* Important Limitation */}
          <div className='bg-yellow-900/20 border-l-4 border-yellow-500 rounded-lg p-6'>
            <div className='flex gap-3'>
              <span className='text-yellow-400 text-2xl'>⚠️</span>
              <div>
                <h4 className='font-bold text-yellow-300 mb-2'>Important Limitation</h4>
                <p className='text-slate-300'>
                  EAS cannot simply replace ONCHAINID inside ERC-3643. ERC-3643 is not just &quot;proof that KYC exists&quot; —
                  it&apos;s a specific trust architecture with trusted issuers, required claim topics, identity binding, and
                  token-side compliance checks. EAS can be the credential substrate, but ERC-3643 still needs an
                  adapter layer.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className='section-divider'></div>

      {/* Section 2: EAS + ERC-7943 */}
      <section className='py-16 px-4'>
        <div className='max-w-4xl mx-auto'>
          <h2 className='text-3xl font-bold mb-8 gradient-text'>2. How EAS Fits ERC-7943</h2>

          <div className='mb-8'>
            <p className='text-slate-300 text-lg mb-6'>
              EAS is even more natural with{' '}
              <a
                href='https://eips.ethereum.org/EIPS/eip-7943'
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-400 hover:text-blue-300 underline'
              >
                ERC-7943
              </a>
              . ERC-7943 intentionally does not prescribe any identity framework — it just wants a standard interface
              for permissioning and enforcement (canSend, canReceive, canTransfer, getFrozenTokens, setFrozenTokens,
              forcedTransfer).
            </p>
          </div>

          {/* Flow Diagram */}
          <div className='bg-slate-800/30 border border-slate-700/50 rounded-lg p-8 mb-8'>
            <div className='flex flex-col items-center space-y-4'>
              {/* Step 1 */}
              <div className='bg-blue-900/30 border border-blue-500/50 rounded-lg p-4 w-full max-w-md text-center'>
                <div className='font-semibold text-blue-300'>KYC / KYB Provider</div>
                <div className='text-sm text-slate-400 mt-1'>or Compliance Oracle</div>
              </div>

              {/* Arrow */}
              <div className='flex flex-col items-center'>
                <div className='w-0.5 h-8 bg-gradient-to-b from-blue-500 to-green-500'></div>
                <div className='text-blue-400'>↓</div>
              </div>

              {/* Step 2 */}
              <div className='bg-blue-900/30 border border-blue-500/50 rounded-lg p-4 w-full max-w-md text-center'>
                <div className='font-semibold text-blue-300'>EAS Attestation</div>
                <div className='text-sm text-slate-400 mt-1'>(under shared schema)</div>
              </div>

              {/* Arrow */}
              <div className='flex flex-col items-center'>
                <div className='w-0.5 h-8 bg-gradient-to-b from-blue-500 to-green-500'></div>
                <div className='text-green-400'>↓</div>
              </div>

              {/* Step 3 */}
              <div className='bg-green-900/30 border border-green-500/50 rounded-lg p-4 w-full max-w-md text-center'>
                <div className='font-semibold text-green-300'>ERC-7943 Token</div>
                <div className='text-sm text-slate-400 mt-1'>Reads attestation state</div>
              </div>

              {/* Arrow */}
              <div className='flex flex-col items-center'>
                <div className='w-0.5 h-8 bg-gradient-to-b from-green-500 to-green-600'></div>
                <div className='text-green-400'>↓</div>
              </div>

              {/* Step 4 */}
              <div className='bg-green-900/30 border border-green-500/50 rounded-lg p-4 w-full max-w-md text-center'>
                <div className='font-semibold text-green-300'>canSend / canReceive / canTransfer</div>
                <div className='text-sm text-slate-400 mt-1'>Returns true or false</div>
              </div>
            </div>
          </div>

          {/* Pattern Explanation */}
          <div className='bg-slate-800/50 border border-slate-700/50 rounded-lg p-6'>
            <h4 className='font-bold text-white mb-4'>The Pattern:</h4>
            <div className='space-y-4'>
              <div className='flex gap-3'>
                <span className='text-green-400 mt-1'>1.</span>
                <p className='text-slate-300'>Register a common EAS schema for identity/compliance claims</p>
              </div>
              <div className='flex gap-3'>
                <span className='text-green-400 mt-1'>2.</span>
                <p className='text-slate-300'>
                  Token or compliance policy contract queries: valid KYC/KYB attestation? trusted issuer? revoked?
                  expired? jurisdiction/investor-class match?
                </p>
              </div>
              <div className='flex gap-3'>
                <span className='text-green-400 mt-1'>3.</span>
                <p className='text-slate-300'>Feed result into canSend, canReceive, canTransfer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className='section-divider'></div>

      {/* Summary Comparison Table */}
      <section className='py-16 px-4 bg-slate-900/30'>
        <div className='max-w-4xl mx-auto'>
          <h2 className='text-3xl font-bold mb-8 text-center gradient-text'>Summary Comparison</h2>

          <div className='overflow-x-auto'>
            <table className='w-full border-collapse'>
              <thead>
                <tr className='border-b-2 border-blue-500'>
                  <th className='text-left p-4 text-slate-400 font-semibold'></th>
                  <th className='text-left p-4 text-purple-400 font-semibold'>ERC-3643 + EAS</th>
                  <th className='text-left p-4 text-green-400 font-semibold'>ERC-7943 + EAS</th>
                </tr>
              </thead>
              <tbody className='text-slate-300'>
                <tr className='border-b border-slate-700/50'>
                  <td className='p-4 font-semibold text-slate-400'>Role of EAS</td>
                  <td className='p-4'>Credential input to existing identity stack</td>
                  <td className='p-4'>Direct compliance data source</td>
                </tr>
                <tr className='border-b border-slate-700/50'>
                  <td className='p-4 font-semibold text-slate-400'>Integration</td>
                  <td className='p-4'>Adapter/bridge layer needed</td>
                  <td className='p-4'>Query attestations directly</td>
                </tr>
                <tr className='border-b border-slate-700/50'>
                  <td className='p-4 font-semibold text-slate-400'>Identity framework</td>
                  <td className='p-4'>ONCHAINID (augmented by EAS)</td>
                  <td className='p-4'>None prescribed (EAS fits natively)</td>
                </tr>
                <tr>
                  <td className='p-4 font-semibold text-slate-400'>Complexity</td>
                  <td className='p-4'>Higher — must map to 3643 structures</td>
                  <td className='p-4'>Lower — minimal interface</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <div className='section-divider'></div>

      {/* Section 3: Best Common Architecture */}
      <section className='py-16 px-4'>
        <div className='max-w-5xl mx-auto'>
          <h2 className='text-3xl font-bold mb-8 gradient-text'>3. Best Common Architecture for Both</h2>

          <p className='text-slate-300 text-lg mb-8'>
            A unified approach uses EAS as the credential foundation, then branches into specialized enforcement
            layers:
          </p>

          {/* Architecture Diagram */}
          <div className='bg-slate-800/30 border border-slate-700/50 rounded-lg p-8'>
            <div className='flex flex-col items-center space-y-6'>
              {/* Top: EAS Schema Registry */}
              <div className='bg-blue-900/40 border-2 border-blue-500 rounded-lg p-6 w-full max-w-2xl text-center'>
                <div className='text-3xl mb-2'>🔷</div>
                <div className='font-bold text-xl text-blue-300'>EAS Schema Registry</div>
                <div className='text-sm text-slate-400 mt-2'>KYC / KYB / AML Schema</div>
              </div>

              {/* Arrow down */}
              <div className='flex flex-col items-center'>
                <div className='w-0.5 h-12 bg-gradient-to-b from-blue-500 to-slate-600'></div>
                <div className='text-slate-400'>↓</div>
              </div>

              {/* Middle: Trusted Attesters */}
              <div className='bg-slate-800/50 border border-slate-600 rounded-lg p-6 w-full max-w-2xl text-center'>
                <div className='font-bold text-lg text-slate-300'>Trusted Attesters</div>
                <div className='text-sm text-slate-400 mt-2'>Banks • KYC Vendors • Transfer Agents</div>
              </div>

              {/* Split arrows */}
              <div className='flex justify-center items-start gap-12 w-full'>
                <div className='flex flex-col items-center'>
                  <div className='w-0.5 h-12 bg-gradient-to-b from-slate-600 to-purple-500'></div>
                  <div className='text-purple-400'>↓</div>
                </div>
                <div className='flex flex-col items-center'>
                  <div className='w-0.5 h-12 bg-gradient-to-b from-slate-600 to-green-500'></div>
                  <div className='text-green-400'>↓</div>
                </div>
              </div>

              {/* Two branches */}
              <div className='grid md:grid-cols-2 gap-8 w-full'>
                {/* Left: ERC-3643 Branch */}
                <div className='flex flex-col space-y-4'>
                  <div className='bg-purple-900/30 border-l-4 border-purple-500 rounded-lg p-4 text-center'>
                    <div className='font-semibold text-purple-300'>ERC-3643 Adapter</div>
                    <div className='text-xs text-slate-400 mt-1'>Map EAS → Claim Topics / Identity</div>
                  </div>
                  <div className='flex flex-col items-center'>
                    <div className='w-0.5 h-8 bg-purple-500'></div>
                    <div className='text-purple-400'>↓</div>
                  </div>
                  <div className='bg-purple-900/30 border-l-4 border-purple-500 rounded-lg p-4 text-center'>
                    <div className='font-semibold text-purple-300'>3643 Token Stack</div>
                    <div className='text-xs text-slate-400 mt-1'>ONCHAINID / IR / CTR / TIR</div>
                  </div>
                </div>

                {/* Right: ERC-7943 Branch */}
                <div className='flex flex-col space-y-4'>
                  <div className='bg-green-900/30 border-l-4 border-green-500 rounded-lg p-4 text-center'>
                    <div className='font-semibold text-green-300'>ERC-7943 Policy</div>
                    <div className='text-xs text-slate-400 mt-1'>Read EAS directly for canTransfer</div>
                  </div>
                  <div className='flex flex-col items-center'>
                    <div className='w-0.5 h-8 bg-green-500'></div>
                    <div className='text-green-400'>↓</div>
                  </div>
                  <div className='bg-green-900/30 border-l-4 border-green-500 rounded-lg p-4 text-center'>
                    <div className='font-semibold text-green-300'>7943 Token</div>
                    <div className='text-xs text-slate-400 mt-1'>Minimal Interface</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className='section-divider'></div>

      {/* Section 4: Shared EAS Schema */}
      <section className='py-16 px-4 bg-slate-900/30'>
        <div className='max-w-4xl mx-auto'>
          <h2 className='text-3xl font-bold mb-8 gradient-text'>4. Shared EAS Schema</h2>

          <p className='text-slate-300 text-lg mb-8'>
            A recommended{' '}
            <a
              href='https://docs.attest.org/docs/core--concepts/schemas'
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-400 hover:text-blue-300 underline'
            >
              schema structure
            </a>{' '}
            for tokenized asset compliance attestations:
          </p>

          <div className='bg-slate-800/50 border border-slate-700/50 rounded-lg overflow-hidden'>
            <table className='w-full'>
              <thead className='bg-slate-900/50'>
                <tr className='border-b border-slate-700'>
                  <th className='text-left p-4 text-blue-400 font-semibold'>Field</th>
                  <th className='text-left p-4 text-blue-400 font-semibold'>Description</th>
                </tr>
              </thead>
              <tbody className='text-slate-300'>
                <tr className='border-b border-slate-700/50'>
                  <td className='p-4 font-mono text-sm text-blue-300'>subject</td>
                  <td className='p-4'>Wallet or legal-entity identifier</td>
                </tr>
                <tr className='border-b border-slate-700/50'>
                  <td className='p-4 font-mono text-sm text-blue-300'>provider</td>
                  <td className='p-4'>Attester / KYC vendor / transfer agent</td>
                </tr>
                <tr className='border-b border-slate-700/50'>
                  <td className='p-4 font-mono text-sm text-blue-300'>status</td>
                  <td className='p-4'>passed / failed / suspended</td>
                </tr>
                <tr className='border-b border-slate-700/50'>
                  <td className='p-4 font-mono text-sm text-blue-300'>credentialType</td>
                  <td className='p-4'>KYC, KYB, accredited, qualified purchaser, professional investor</td>
                </tr>
                <tr className='border-b border-slate-700/50'>
                  <td className='p-4 font-mono text-sm text-blue-300'>jurisdiction</td>
                  <td className='p-4'>Regulatory jurisdiction (ISO country code)</td>
                </tr>
                <tr className='border-b border-slate-700/50'>
                  <td className='p-4 font-mono text-sm text-blue-300'>investorCategory</td>
                  <td className='p-4'>Investor classification</td>
                </tr>
                <tr className='border-b border-slate-700/50'>
                  <td className='p-4 font-mono text-sm text-blue-300'>riskTier</td>
                  <td className='p-4'>Risk assessment level</td>
                </tr>
                <tr className='border-b border-slate-700/50'>
                  <td className='p-4 font-mono text-sm text-blue-300'>issuedAt</td>
                  <td className='p-4'>Timestamp of issuance</td>
                </tr>
                <tr className='border-b border-slate-700/50'>
                  <td className='p-4 font-mono text-sm text-blue-300'>expiresAt</td>
                  <td className='p-4'>Expiration timestamp</td>
                </tr>
                <tr className='border-b border-slate-700/50'>
                  <td className='p-4 font-mono text-sm text-blue-300'>revocable</td>
                  <td className='p-4'>Whether attestation can be revoked</td>
                </tr>
                <tr className='border-b border-slate-700/50'>
                  <td className='p-4 font-mono text-sm text-blue-300'>refUID</td>
                  <td className='p-4'>Reference to another attestation for modular composition</td>
                </tr>
                <tr>
                  <td className='p-4 font-mono text-sm text-blue-300'>evidenceHash</td>
                  <td className='p-4'>Document hash (not the document itself)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className='bg-blue-900/20 border-l-4 border-blue-500 rounded-lg p-6 mt-8'>
            <div className='flex gap-3'>
              <span className='text-blue-400 text-2xl'>ℹ️</span>
              <div>
                <h4 className='font-bold text-blue-300 mb-2'>Privacy by Design</h4>
                <p className='text-slate-300'>
                  <strong>No raw PII onchain</strong> — only compliance facts and references. Personal data stays
                  offchain with the attester.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className='section-divider'></div>

      {/* Section 5: Why EAS? (Skeptic's View) */}
      <section className='py-16 px-4'>
        <div className='max-w-4xl mx-auto'>
          <h2 className='text-3xl font-bold mb-8 gradient-text'>5. Why EAS? (Skeptic&apos;s View)</h2>

          <p className='text-slate-300 text-lg mb-8'>
            A balanced perspective on when EAS adds value — and when it doesn&apos;t solve your problems:
          </p>

          {/* Value Proposition */}
          <div className='mb-8'>
            <h3 className='text-xl font-bold text-green-400 mb-4'>✅ EAS Adds Value When You Want:</h3>
            <div className='space-y-3'>
              {[
                'One credential format reused across multiple token standards',
                'Portability across ecosystems and apps',
                'Attestations from many providers under a common schema',
                'Offchain or delegated issuance workflows',
                'Cleaner separation between identity evidence and token enforcement',
              ].map((item, idx) => (
                <div key={idx} className='flex gap-3 bg-green-900/10 border border-green-900/30 rounded-lg p-4'>
                  <span className='text-green-400'>✓</span>
                  <p className='text-slate-300'>
                    {item}
                    {idx === 3 && (
                      <span className='text-slate-400 text-sm ml-2'>
                        (See{' '}
                        <a
                          href='https://docs.attest.org/docs/core--concepts/delegated-attestations'
                          target='_blank'
                          rel='noopener noreferrer'
                          className='text-blue-400 hover:text-blue-300 underline'
                        >
                          delegated attestations
                        </a>
                        )
                      </span>
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* What EAS Doesn&apos;t Solve */}
          <div>
            <h3 className='text-xl font-bold text-yellow-400 mb-4'>⚠️ But EAS Does NOT Remove the Need For:</h3>
            <div className='space-y-3'>
              {[
                'Trusted attester governance',
                'Issuer approval policy',
                'Privacy design',
                'Revocation synchronization',
                'Token-side enforcement logic',
              ].map((item, idx) => (
                <div key={idx} className='flex gap-3 bg-yellow-900/10 border border-yellow-900/30 rounded-lg p-4'>
                  <span className='text-yellow-400'>⚠</span>
                  <p className='text-slate-300'>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className='section-divider'></div>

      {/* Section 6: Bottom Line */}
      <section className='py-16 px-4 bg-slate-900/30'>
        <div className='max-w-4xl mx-auto'>
          <h2 className='text-3xl font-bold mb-8 text-center gradient-text'>6. Bottom Line</h2>

          <div className='grid md:grid-cols-2 gap-6 mb-12'>
            {/* ERC-3643 Card */}
            <div className='bg-purple-900/20 border-l-4 border-purple-500 rounded-lg p-6'>
              <h3 className='text-xl font-bold text-purple-300 mb-3'>For ERC-3643</h3>
              <p className='text-slate-300'>
                EAS = <strong>credential issuance layer</strong> feeding an adapter into the 3643
                identity/compliance stack
              </p>
            </div>

            {/* ERC-7943 Card */}
            <div className='bg-green-900/20 border-l-4 border-green-500 rounded-lg p-6'>
              <h3 className='text-xl font-bold text-green-300 mb-3'>For ERC-7943</h3>
              <p className='text-slate-300'>
                EAS = <strong>shared compliance-attestation backend</strong> used directly by canSend / canReceive /
                canTransfer
              </p>
            </div>
          </div>

          {/* Key Quote */}
          <div className='bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/30 rounded-lg p-8 mb-8'>
            <blockquote className='text-xl text-center text-slate-200 italic leading-relaxed'>
              &quot;EAS is where credentials become portable. ERC-7943 is where portability becomes interoperable. ERC-3643
              is where portability gets domesticated into a stricter regulated stack.&quot;
            </blockquote>
          </div>

          {/* Additional Note */}
          <div className='bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 text-center'>
            <p className='text-slate-300'>
              <strong className='text-blue-400'>Note:</strong>{' '}
              <a
                href='https://eips.ethereum.org/EIPS/eip-7943'
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-400 hover:text-blue-300 underline'
              >
                ERC-7943
              </a>{' '}
              is token-standard-agnostic — works with ERC-20, ERC-721, and ERC-1155 variants.
            </p>
          </div>
        </div>
      </section>

      <div className='section-divider'></div>

      {/* References Section */}
      <section className='py-16 px-4'>
        <div className='max-w-4xl mx-auto'>
          <h2 className='text-3xl font-bold mb-8 gradient-text'>References</h2>

          <div className='grid gap-4'>
            {[
              {
                title: 'EAS Contracts',
                url: 'https://github.com/ethereum-attestation-service/eas-contracts',
                description: 'Core smart contracts for Ethereum Attestation Service',
              },
              {
                title: 'ERC-3643 Official Repository',
                url: 'https://github.com/ERC-3643/ERC-3643',
                description: 'Reference implementation of the T-REX protocol for security tokens',
              },
              {
                title: 'EAS Schemas Documentation',
                url: 'https://docs.attest.org/docs/core--concepts/schemas',
                description: 'How to define and register attestation schemas',
              },
              {
                title: 'EAS Revocation Documentation',
                url: 'https://docs.attest.org/docs/core--concepts/revocation',
                description: 'Understanding attestation revocation mechanisms',
              },
              {
                title: 'ERC-7943 EIP Specification',
                url: 'https://eips.ethereum.org/EIPS/eip-7943',
                description: 'Minimal RWA control interface standard',
              },
              {
                title: 'EAS Delegated Attestations',
                url: 'https://docs.attest.org/docs/core--concepts/delegated-attestations',
                description: 'Offchain attestation issuance workflows',
              },
            ].map((ref, idx) => (
              <a
                key={idx}
                href={ref.url}
                target='_blank'
                rel='noopener noreferrer'
                className='bg-slate-800/50 border border-slate-700/50 rounded-lg p-5 hover:border-blue-500/50 transition-colors card-hover'
              >
                <h3 className='font-bold text-blue-400 mb-2'>{ref.title}</h3>
                <p className='text-slate-400 text-sm mb-2'>{ref.description}</p>
                <p className='text-slate-500 text-xs font-mono'>{ref.url}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-20 px-4 text-center'>
        <div className='max-w-2xl mx-auto'>
          <h2 className='text-3xl md:text-4xl font-bold mb-6 text-white'>See It In Action</h2>
          <p className='text-slate-400 mb-8'>
            Walk through an interactive demo showing how EAS attestations work with compliant tokens.
          </p>
          <Link
            href='/demo'
            className='btn btn-lg bg-blue-600 hover:bg-blue-500 border-none text-white gap-2 px-8 shadow-lg shadow-blue-600/25'
          >
            Start Interactive Demo
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={2}
              stroke='currentColor'
              className='w-5 h-5'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3' />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  )
}
