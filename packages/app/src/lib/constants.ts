// EAS Contract Addresses on Sepolia
export const EAS_CONTRACT_ADDRESS = '0xC2679fBD37d54388Ce493F1DB75320D236e1815e' as const
export const SCHEMA_REGISTRY_ADDRESS = '0x0a7E2Ff54e76B8E6659aedc9103FB21c038050D0' as const

// Chain Configuration
export const SEPOLIA_CHAIN_ID = 11155111

// Schema Definition for investor attestations
// Schema: address identity, uint8 kycStatus, uint8 accreditationType, uint16 countryCode, uint64 expirationTimestamp
export const INVESTOR_SCHEMA = 'address identity, uint8 kycStatus, uint8 accreditationType, uint16 countryCode, uint64 expirationTimestamp'

// Claim Topics (ERC-3643 standard)
export const CLAIM_TOPICS = {
  KYC: 1n,
  ACCREDITATION: 7n,
} as const

// KYC Status values
export const KYC_STATUS = {
  NOT_VERIFIED: 0,
  VERIFIED: 1,
  PENDING: 2,
  REJECTED: 3,
} as const

// Accreditation Types
export const ACCREDITATION_TYPE = {
  NONE: 0,
  ACCREDITED_INVESTOR: 1,  // US SEC Rule 501
  QUALIFIED_PURCHASER: 2,  // US Investment Company Act
  PROFESSIONAL_INVESTOR: 3, // EU MiFID II
} as const

// Country Codes (ISO 3166-1 numeric)
export const COUNTRY_CODES = {
  USA: 840,
  GERMANY: 276,
  FRANCE: 250,
  UK: 826,
  SWITZERLAND: 756,
} as const

// Pre-defined investor personas for the demo
export const DEMO_INVESTORS = {
  ALICE: {
    name: 'Alice',
    description: 'US Accredited Investor',
    // Using deterministic addresses for demo (generated from seed)
    address: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8' as const,
    kycStatus: KYC_STATUS.VERIFIED,
    accreditationType: ACCREDITATION_TYPE.ACCREDITED_INVESTOR,
    countryCode: COUNTRY_CODES.USA,
  },
  BOB: {
    name: 'Bob',
    description: 'EU Professional Investor',
    address: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC' as const,
    kycStatus: KYC_STATUS.VERIFIED,
    accreditationType: ACCREDITATION_TYPE.QUALIFIED_PURCHASER,
    countryCode: COUNTRY_CODES.GERMANY,
  },
  CHARLIE: {
    name: 'Charlie',
    description: 'Rejected - No KYC',
    address: '0x90F79bf6EB2c4f870365E785982E1f101E93b906' as const,
    kycStatus: KYC_STATUS.NOT_VERIFIED,
    accreditationType: ACCREDITATION_TYPE.NONE,
    countryCode: COUNTRY_CODES.USA,
  },
} as const

// LocalStorage keys
export const STORAGE_KEYS = {
  DEPLOYED_CONTRACTS: 'eas-bridge-deployed-contracts',
  SCHEMA_UID: 'eas-bridge-schema-uid',
  ATTESTATION_UIDS: 'eas-bridge-attestation-uids',
} as const

// Etherscan URL for Sepolia
export const SEPOLIA_ETHERSCAN = 'https://sepolia.etherscan.io'
