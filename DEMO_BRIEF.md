# EAS-ERC3643 Bridge Demo UI

## What This Is
An interactive demo UI for the EAS-to-ERC-3643 Identity Bridge. It lets users walk through a "Tokenized Treasury Fund" scenario on Sepolia testnet — deploying contracts, creating attestations, verifying investors, and revoking access — all through a guided web interface.

## Tech Stack
- This is a nexth starter (Next.js 15 + Wagmi 2 + Reown AppKit + Tailwind + daisyUI)
- Already scaffolded in `packages/app/` with dependencies installed
- Contract ABIs are in `../abis/` (EASClaimVerifier, EASTrustedIssuersAdapter, EASIdentityProxy)
- Target chain: Sepolia (chainId 11155111)
- EAS contract on Sepolia: `0xC2679fBD37d54388Ce493F1DB75320D236e1815e`

## Pages to Build

### 1. Landing Page (`/`)
- Hero: "EAS-ERC3643 Identity Bridge — Live Demo"
- Brief explanation of what the bridge does (2-3 sentences)
- "Start Demo" button → goes to `/demo`
- Show EEA branding (use 🔷 emoji as placeholder)

### 2. Demo Page (`/demo`) — The Main Experience
A step-by-step guided walkthrough with these stages:

**Step 1: Connect Wallet**
- Connect to Sepolia via Reown AppKit
- Show connected address + Sepolia ETH balance

**Step 2: Deploy Contracts**
- Button to deploy: EASClaimVerifier, EASTrustedIssuersAdapter, EASIdentityProxy, MockClaimTopicsRegistry
- Show deployed addresses as they land
- Store addresses in React state (and localStorage for persistence)
- If already deployed (localStorage), show "Already deployed" with addresses and option to redeploy

**Step 3: Configure Bridge**
- Auto-configure: set EAS address, adapter, proxy, registry on the verifier
- Map claim topics: KYC (topic 1) and Accreditation (topic 7) to a schema
- Show tx hashes for each config step
- One "Configure All" button that runs all txs sequentially

**Step 4: Add KYC Provider**

> **User Story:** "As a token issuer, I want to approve a KYC provider so their attestations are accepted for my security token."
>
> **What the user sees:** You click "Authorize KYC Provider" — your wallet becomes a trusted identity verifier. A confirmation shows: "✅ Your wallet is now an authorized KYC provider for this token." This is the moment where the issuer decides WHO they trust to verify investors.
>
> **What it proves:** Token issuers control which KYC providers are accepted. They can add or remove providers at any time — no vendor lock-in.

- Add the connected wallet as a trusted attester for topics 1 and 7
- Show confirmation with Etherscan link

**Step 5: Onboard Investors (Create Attestations)**

> **User Story:** "As a KYC provider, I want to issue identity attestations for investors I've verified, so they can participate in regulated token offerings."
>
> **What the user sees:** Three investor cards representing real-world scenarios:
>
> | Investor | Profile | KYC Status | Country | Accreditation |
> |----------|---------|------------|---------|---------------|
> | 🧑 Alice | US hedge fund LP | ✅ Verified | USA | Accredited Investor |
> | 👨 Bob | German institutional buyer | ✅ Verified | Germany | Qualified Purchaser |
> | 👤 Charlie | Unverified applicant | ❌ Not verified | — | None |
>
> For Alice and Bob, you click "Issue KYC Attestation" — this creates a real EAS attestation on Sepolia. The attestation UID appears with a link to the [EAS Explorer](https://sepolia.easscan.org). Charlie has no attestation — he never passed KYC.
>
> **What it proves:** KYC providers issue attestations through EAS (a public, chain-agnostic standard) instead of a proprietary system. The same attestation can be reused across multiple tokens and chains.

- For Alice and Bob: button to create EAS attestation on-chain
- For Charlie: grayed out card — "No KYC attestation"
- Display attestation UIDs + EAS Explorer links when created

**Step 6: Register Attestations on the Bridge**

> **User Story:** "As a compliance officer, I want to link an investor's EAS attestation to the token's verification system so the token contract can check eligibility automatically."
>
> **What the user sees:** For Alice and Bob, you click "Register on Bridge." The bridge contract validates the attestation is real, from a trusted provider, and matches the required schema — then indexes it. A green checkmark appears: "Attestation registered for Alice — ready for verification."
>
> **What it proves:** The bridge connects two worlds: EAS (open attestation layer) and ERC-3643 (security token compliance). Registration is permissionless — anyone can register a valid attestation, but only attestations from trusted providers are accepted.

- For Alice and Bob: button to register attestations
- Show validation feedback + Etherscan links

**Step 7: Verify Investor Eligibility ✅❌ — THE PAYOFF**

> **User Story:** "As a token contract, I need to check if an investor is eligible before allowing a transfer — and I want to do this using EAS attestations instead of (or alongside) ONCHAINID."
>
> **What the user sees:** Three investor cards with a big "Verify All" button. When clicked:
>
> | Investor | Result | Why |
> |----------|--------|-----|
> | 🧑 Alice | ✅ **ELIGIBLE** | Has valid KYC + accreditation attestations from trusted provider |
> | 👨 Bob | ✅ **ELIGIBLE** | Has valid KYC + accreditation attestations from trusted provider |
> | 👤 Charlie | ❌ **NOT ELIGIBLE** | No attestations — never passed KYC |
>
> Each result is a live on-chain call to `verifier.isVerified(address)`. Green = can buy/receive the token. Red = blocked.
>
> **What it proves:** This is the core value. The ERC-3643 compliance check now works with EAS attestations. Token transfers are still fully regulated — but the identity layer is open, composable, and multi-chain instead of locked into one provider.

- "Verify All" button → calls `isVerified()` for each investor
- Large, clear green/red result cards
- Show that this is the SAME function an ERC-3643 token calls during transfers

**Step 8: Revoke Access — Real-Time Compliance ✅→❌**

> **User Story:** "As a KYC provider, I need to revoke an investor's attestation when they fail ongoing compliance checks — and the token should immediately block them."
>
> **What the user sees:** You click "Revoke Bob's KYC" — this calls EAS to revoke the attestation. Then "Re-Verify Bob" → his status flips from ✅ ELIGIBLE to ❌ NOT ELIGIBLE in real time. The card turns red.
>
> **What it proves:** Compliance is enforced continuously, not just at onboarding. If a KYC provider revokes an attestation (e.g., sanctions hit, AML flag), the investor is immediately blocked from trading. No manual intervention needed. This is how regulated securities MUST work — and now it works with EAS.

### 3. Explorer Page (`/explorer`)
- Input any address → check `isVerified()` against deployed verifier
- Show result with explanation
- Link to Sepolia Etherscan for each contract

## Design Guidelines
- Use daisyUI theme "corporate" or "business" (professional look)
- Color scheme: blues and grays (Ethereum/EEA vibes)
- Each demo step should be a collapsible card/section
- Steps unlock sequentially (can't skip ahead)
- Show transaction links to Sepolia Etherscan throughout
- Mobile responsive

## Contract Interaction Details

### EAS Attestation Creation
Use EAS contract at `0xC2679fBD37d54388Ce493F1DB75320D236e1815e` on Sepolia.
Schema for attestations: `address identity, uint8 kycStatus, uint8 accreditationType, uint16 countryCode, uint64 expirationTimestamp`

To create an attestation, call EAS.attest() with:
```
schema: <registered schema UID>
recipient: <investor address>
data: abi.encode(identity, kycStatus, accreditationType, countryCode, expirationTimestamp)
```

### Schema Registration
Need to register our schema first via EAS SchemaRegistry at `0x0a7E2Ff54e76B8E6659aedc9103FB21c038050D0` (Sepolia).

### Important ABIs
- Bridge contracts: use ABIs from `../abis/`
- EAS: use the standard EAS ABI (import from @ethereum-attestation-service/eas-sdk or inline the needed functions)
- SchemaRegistry: standard SchemaRegistry ABI

## File Organization
- `src/app/page.tsx` — Landing
- `src/app/demo/page.tsx` — Demo walkthrough  
- `src/app/explorer/page.tsx` — Address explorer
- `src/components/demo/` — Demo step components (Step1Connect, Step2Deploy, etc.)
- `src/lib/contracts.ts` — Contract addresses, ABIs, configs
- `src/lib/constants.ts` — Chain config, EAS addresses, schema definitions
- `src/hooks/` — Custom hooks for bridge interactions

## What NOT to Do
- Don't use hardhat — we use Foundry (packages/hardhat already deleted)
- Don't create a WalletConnect project ID — just use empty string for now, Reown works without it for testing
- Don't overcomplicate — this is a demo, not production. Clean and clear > feature-rich.

When completely finished, run this command to notify me:
openclaw system event --text "Done: EAS-ERC3643 Bridge Demo UI built with all 8 demo steps, landing page, and explorer" --mode now
