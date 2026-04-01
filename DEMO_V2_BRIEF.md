# EAS-ERC3643 Bridge Demo V2 — Pure UI Showcase

## CRITICAL CHANGE
This is NOT a working dApp. No wallet connection. No blockchain calls. No Web3 providers.
It's a **pure UI demo** that tells the story visually through interactive animations and simulated flows.

## Delete/Replace
- Delete ALL web3/wagmi/wallet code
- Delete the Reown/WalletConnect config
- Delete the hooks that call contracts
- Keep: Next.js + Tailwind + daisyUI (for styling)
- This is a STATIC SITE. No API calls. Everything is simulated in the UI.

## The Story Arc (3 acts)

### Act 1: THE PROBLEM (landing page `/`)

**Hero section:**
"Security tokens shouldn't require vendor lock-in for identity"

**Visual comparison — two columns:**

| WITHOUT the bridge (today) | WITH the bridge |
|---|---|
| 🔴 One identity vendor (ONCHAINID) | 🟢 Any EAS-compatible KYC provider |
| 🔴 Deploy identity contract per investor ($$$) | 🟢 Reuse existing attestations (free) |
| 🔴 Re-verify on every chain | 🟢 One KYC, works everywhere |
| 🔴 Revocation = manual process | 🟢 Revoke once, blocked instantly |

Each row should animate in sequentially for impact.

**Below the comparison:**
"See how it works →" button that scrolls to the demo section or navigates to `/demo`

### Act 2: THE DEMO (`/demo`) — Interactive simulated walkthrough

This is ONE scrollable page with animated sections. Each section has a "Run" or "Next" button that triggers a simulated animation.

**Section 1: "Meet the Players"**
Three cards showing the scenario:

- **🏛️ Treasury Fund Inc.** — Token issuer launching a tokenized US Treasury product
- **🔍 VerifyKYC Co.** — Licensed KYC provider using EAS attestations
- **Three investors:**
  - 👩 Alice — US accredited investor, KYC verified ✅
  - 👨 Bob — German institutional buyer, KYC verified ✅
  - 👤 Charlie — Unverified applicant ❌

**Section 2: "The KYC Provider Issues Attestations"**
Animated flow showing:
1. VerifyKYC Co. verifies Alice's identity (show checkmarks appearing: ID ✓, AML ✓, Accreditation ✓)
2. An "EAS Attestation" card slides in with a fake attestation UID
3. Same for Bob
4. Charlie's flow shows ❌ — "KYC Failed — No attestation issued"

Make it feel like a real process happening. Use delays, transitions, progress bars.

**Section 3: "The Fund Checks Eligibility"**
The payoff moment. Show three verification cards:

- Click "Verify Alice" → loading animation (1s) → big green ✅ ELIGIBLE with confetti or glow effect
- Click "Verify Bob" → loading animation (1s) → big green ✅ ELIGIBLE
- Click "Verify Charlie" → loading animation (1s) → big red ❌ NOT ELIGIBLE with shake effect

A "Verify All" button that runs all three in sequence with dramatic timing.

Below: explain in 1 sentence: "The token contract calls isVerified() — returns true only if the investor has valid attestations from a trusted provider."

**Section 4: "Instant Revocation"**
Show Bob's card currently green ✅ ELIGIBLE.
Button: "⚠️ Revoke Bob's KYC (AML flag detected)"
Click → Bob's attestation card shows "REVOKED" stamp → his status flips from ✅ to ❌ with animation
Below: "Bob can no longer trade. Immediate. Automatic. No manual intervention."

**Section 5: "Why This Matters" (summary)**
Three big stat cards:
- "500,000 gas saved" — No per-investor identity contract deployment
- "1 KYC → 4 chains" — Ethereum, Base, Arbitrum, Optimism
- "0 seconds" — Time to enforce compliance after revocation

### Act 3: EXPLORE (`/explorer`)
A simple interactive section (can be on same page):
- Fake address input
- Fake "Check Eligibility" button
- Shows simulated result (verified/not verified)
- Links to the real GitHub repo

## Design Requirements

### Visual Style
- Dark theme (slate/navy background: #0f172a)
- Blue accents (#3b82f6) for EAS/bridge elements
- Green (#22c55e) for verified/eligible
- Red (#ef4444) for not eligible/revoked
- Clean, modern, professional — think Stripe or Linear landing page
- daisyUI theme: "business" or custom dark theme

### Animation Requirements
- Use CSS transitions and Tailwind animate classes
- Staggered entrance animations for comparison table rows
- Smooth color transitions for verification results
- Shake animation for rejected/revoked states
- Pulse/glow for successful verifications
- Progress bar animations for simulated "checking..."

### Typography
- Large, bold headings
- Short, punchy descriptions
- No walls of text
- Each section should be understandable in 5 seconds of scanning

### Mobile
- Must work on mobile (people will open this from Telegram/Twitter links)
- Stack columns vertically on mobile
- Touch-friendly buttons

## File Structure
Simplify massively:
```
packages/app/src/
├── app/
│   ├── layout.tsx      # Simple layout, no Web3 providers
│   ├── page.tsx        # Act 1: The Problem (landing)
│   └── demo/
│       └── page.tsx    # Act 2 + 3: Demo + Explorer
├── components/
│   ├── Hero.tsx
│   ├── Comparison.tsx
│   ├── Players.tsx
│   ├── AttestationFlow.tsx
│   ├── VerificationCards.tsx
│   ├── RevocationDemo.tsx
│   ├── WhyItMatters.tsx
│   └── Explorer.tsx
└── lib/
    └── constants.ts    # Fake data (addresses, UIDs, etc.)
```

## What to DELETE
- All files in `src/context/` (Web3 providers)
- All files in `src/hooks/` (contract interaction hooks)
- All files in `src/components/demo/Step*.tsx` (old step components)
- All wagmi/viem/reown imports
- `src/lib/contracts.ts` (real ABIs/addresses)
- Any references to WalletConnect project IDs

## What to KEEP
- next.config.js (with static export settings)
- Tailwind config
- daisyUI
- Basic layout structure

## Key Principle
**Every element on the page should answer: "Why should I care?"**
Not "how does it work technically" but "what does this mean for me?"

## EEA Branding
- Add "Built by the Enterprise Ethereum Alliance" in footer
- Use 🔷 as brand element
- Link to https://entethalliance.org
- Link to GitHub repo

When completely finished:
1. Run `npm run build` to verify it compiles
2. Run: openclaw system event --text "Done: Demo V2 rebuilt as pure UI showcase — no wallet needed, story-driven, animated" --mode now
