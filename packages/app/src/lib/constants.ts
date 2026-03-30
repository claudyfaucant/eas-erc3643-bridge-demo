// Demo data for the UI showcase - all simulated, no real blockchain calls

export const DEMO_INVESTORS = {
  ALICE: {
    name: 'Alice',
    emoji: '👩',
    description: 'US Accredited Investor',
    address: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
    country: 'United States',
    countryFlag: '🇺🇸',
    verified: true,
    accreditationType: 'Accredited Investor (SEC Rule 501)',
  },
  BOB: {
    name: 'Bob',
    emoji: '👨',
    description: 'German Institutional Buyer',
    address: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
    country: 'Germany',
    countryFlag: '🇩🇪',
    verified: true,
    accreditationType: 'Professional Investor (MiFID II)',
  },
  CHARLIE: {
    name: 'Charlie',
    emoji: '👤',
    description: 'Unverified Applicant',
    address: '0x90F79bf6EB2c4f870365E785982E1f101E93b906',
    country: 'Unknown',
    countryFlag: '🌍',
    verified: false,
    accreditationType: 'None',
  },
} as const

// Fake attestation UIDs for the demo
export const FAKE_ATTESTATION_UIDS = {
  ALICE: '0x8f4d...a3b2c1d9e8f7',
  BOB: '0x2b7e...9c4a5d6e7f8a',
}

// Stats for the "Why It Matters" section
export const IMPACT_STATS = {
  gasSaved: '500,000',
  chainsSupported: 4,
  chains: ['Ethereum', 'Base', 'Arbitrum', 'Optimism'],
  revocationTime: '0 seconds',
}
