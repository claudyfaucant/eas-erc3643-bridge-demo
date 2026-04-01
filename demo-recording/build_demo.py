#!/usr/bin/env python3
"""Build annotated demo frames for the EAS-ERC3643 Bridge demo video."""

from PIL import Image, ImageDraw, ImageFont
import os, subprocess

FRAMES_DIR = os.path.join(os.path.dirname(__file__), "frames")
OUTPUT_DIR = os.path.dirname(__file__)
WIDTH, HEIGHT = 1280, 720
BG_COLOR = "#0f172a"  # Dark slate
ACCENT = "#3b82f6"    # Blue
GREEN = "#22c55e"
RED = "#ef4444"
YELLOW = "#eab308"
WHITE = "#ffffff"
GRAY = "#94a3b8"
DARK_CARD = "#1e293b"

os.makedirs(FRAMES_DIR, exist_ok=True)

def get_font(size):
    """Try to find a good font."""
    paths = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
    ]
    for p in paths:
        if os.path.exists(p):
            return ImageFont.truetype(p, size)
    return ImageFont.load_default()

def get_font_regular(size):
    paths = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
    ]
    for p in paths:
        if os.path.exists(p):
            return ImageFont.truetype(p, size)
    return ImageFont.load_default()

font_title = get_font(42)
font_subtitle = get_font(24)
font_body = get_font_regular(20)
font_small = get_font_regular(16)
font_step = get_font(28)
font_big = get_font(56)

def new_frame():
    img = Image.new("RGB", (WIDTH, HEIGHT), BG_COLOR)
    return img, ImageDraw.Draw(img)

def draw_header(draw, step_num, step_title):
    """Draw consistent header with step indicator."""
    # Top bar
    draw.rectangle([0, 0, WIDTH, 60], fill="#0d1117")
    draw.text((20, 15), "◆ EAS-ERC3643 Bridge", fill=ACCENT, font=get_font(22))
    draw.text((WIDTH - 200, 15), "Sepolia Testnet", fill=YELLOW, font=get_font(18))
    
    # Step indicator
    draw.rounded_rectangle([30, 80, WIDTH - 30, 150], radius=12, fill=DARK_CARD)
    draw.ellipse([50, 90, 90, 130], fill=ACCENT)
    draw.text((60, 93), str(step_num), fill=WHITE, font=get_font(24))
    draw.text((110, 95), step_title, fill=WHITE, font=font_step)

def draw_subtitle_bar(draw, text):
    """Draw subtitle bar at bottom."""
    draw.rectangle([0, HEIGHT - 80, WIDTH, HEIGHT], fill="#000000cc")
    # Center text
    bbox = draw.textbbox((0, 0), text, font=font_body)
    tw = bbox[2] - bbox[0]
    x = (WIDTH - tw) // 2
    draw.text((x, HEIGHT - 60), text, fill=WHITE, font=font_body)

def save(img, name):
    path = os.path.join(FRAMES_DIR, name)
    img.save(path)
    print(f"  ✅ {name}")

# ==================== FRAME 0: Title ====================
print("Building frames...")

img, draw = new_frame()
draw.text((WIDTH//2 - 280, 150), "◆", fill=ACCENT, font=get_font(80))
draw.text((WIDTH//2 - 200, 160), "EAS-ERC3643", fill=WHITE, font=get_font(60))
draw.text((WIDTH//2 - 160, 240), "Identity Bridge", fill=ACCENT, font=font_title)
draw.text((WIDTH//2 - 200, 320), "Live Demo on Sepolia Testnet", fill=GRAY, font=font_subtitle)
draw.text((WIDTH//2 - 250, 420), "Tokenized Treasury Fund Scenario", fill=YELLOW, font=font_subtitle)
draw.text((WIDTH//2 - 180, 500), "Enterprise Ethereum Alliance", fill=GRAY, font=font_body)
draw_subtitle_bar(draw, "A bridge connecting EAS attestations to ERC-3643 security token compliance")
save(img, "00_title.png")

# ==================== FRAME 1: The Problem ====================
img, draw = new_frame()
draw_header(draw, "?", "The Problem")

y = 180
draw.text((50, y), "Today: Security tokens are locked into one identity system", fill=WHITE, font=font_subtitle)
y += 60
draw.rounded_rectangle([50, y, 600, y+80], radius=10, fill="#7f1d1d")
draw.text((70, y+10), "ERC-3643 Token", fill=WHITE, font=font_step)
draw.text((70, y+45), "Requires ONCHAINID — closed, single-vendor", fill="#fca5a5", font=font_small)

y += 110
draw.text((80, y), "→", fill=RED, font=get_font(30))
draw.text((120, y), "Each investor needs a proprietary identity contract", fill=GRAY, font=font_body)
y += 35
draw.text((80, y), "→", fill=RED, font=get_font(30))
draw.text((120, y), "Only specific KYC providers work", fill=GRAY, font=font_body)
y += 35
draw.text((80, y), "→", fill=RED, font=get_font(30))
draw.text((120, y), "Can't reuse identity across tokens or chains", fill=GRAY, font=font_body)

draw_subtitle_bar(draw, "The bridge solves this by connecting EAS — an open attestation standard — to ERC-3643 compliance")
save(img, "01_problem.png")

# ==================== FRAME 2: Connect Wallet ====================
img, draw = new_frame()
draw_header(draw, 1, "Connect Wallet")

draw.rounded_rectangle([50, 180, WIDTH-50, 400], radius=12, fill=DARK_CARD)
draw.text((80, 200), "✅  Wallet Connected", fill=GREEN, font=font_subtitle)
draw.text((80, 250), "Address:  0x7946...71b4", fill=WHITE, font=font_body)
draw.text((80, 285), "Network:  Sepolia (Chain ID: 11155111)", fill=WHITE, font=font_body)
draw.text((80, 320), "Balance:  0.05 ETH", fill=WHITE, font=font_body)

draw.rounded_rectangle([80, 360, 250, 390], radius=8, fill=GREEN)
draw.text((100, 363), "Connected ✓", fill=WHITE, font=font_small)

draw_subtitle_bar(draw, "Step 1: Connect your wallet to Sepolia testnet — this wallet will act as the token issuer")
save(img, "02_connect.png")

# ==================== FRAME 3: Deploy Contracts ====================
img, draw = new_frame()
draw_header(draw, 2, "Deploy Contracts")

contracts = [
    ("EASClaimVerifier", "0x1234...abcd", "Core verification logic"),
    ("TrustedIssuersAdapter", "0x5678...ef01", "Manages trusted KYC providers"),
    ("EASIdentityProxy", "0x9abc...2345", "Multi-wallet identity mapping"),
    ("ClaimTopicsRegistry", "0xdef0...6789", "Required compliance topics"),
]

y = 180
for name, addr, desc in contracts:
    draw.rounded_rectangle([50, y, WIDTH-50, y+65], radius=10, fill=DARK_CARD)
    draw.text((80, y+8), f"✅ {name}", fill=GREEN, font=font_body)
    draw.text((80, y+35), f"{addr}  —  {desc}", fill=GRAY, font=font_small)
    y += 80

draw.text((80, y+20), "4 contracts deployed in 4 transactions", fill=ACCENT, font=font_body)

draw_subtitle_bar(draw, "Step 2: Deploy the bridge contracts — these sit between EAS and your ERC-3643 token")
save(img, "03_deploy.png")

# ==================== FRAME 4: Configure Bridge ====================
img, draw = new_frame()
draw_header(draw, 3, "Configure Bridge")

y = 180
configs = [
    "✅ EAS address set (0xC267...Ce587)",
    "✅ Trusted Issuers Adapter linked",
    "✅ Identity Proxy linked",
    "✅ Claim Topics Registry linked",
    "✅ Schema registered on EAS",
    "✅ KYC topic (1) → mapped to schema",
    "✅ Accreditation topic (7) → mapped to schema",
]
for c in configs:
    draw.text((80, y), c, fill=GREEN, font=font_body)
    y += 35

draw.text((80, y+20), "7 configuration transactions completed", fill=ACCENT, font=font_body)

draw_subtitle_bar(draw, "Step 3: Wire everything together — EAS address, topic-to-schema mappings, required compliance checks")
save(img, "04_configure.png")

# ==================== FRAME 5: Add KYC Provider ====================
img, draw = new_frame()
draw_header(draw, 4, "Add KYC Provider")

draw.rounded_rectangle([50, 180, WIDTH-50, 450], radius=12, fill=DARK_CARD)
draw.text((80, 200), "Authorize KYC Provider", fill=WHITE, font=font_subtitle)

draw.text((80, 260), "Provider:  0x7946...71b4 (your wallet)", fill=WHITE, font=font_body)
draw.text((80, 300), "Authorized for:", fill=GRAY, font=font_body)
draw.text((100, 335), "• Topic 1:  KYC Verification", fill=WHITE, font=font_body)
draw.text((100, 370), "• Topic 7:  Accreditation Status", fill=WHITE, font=font_body)

draw.rounded_rectangle([80, 410, 380, 440], radius=8, fill=GREEN)
draw.text((100, 413), "✅ Provider Authorized", fill=WHITE, font=font_small)

draw.rounded_rectangle([50, 480, WIDTH-50, 580], radius=12, fill="#1a2332")
draw.text((80, 490), "💡  What this means:", fill=YELLOW, font=font_body)
draw.text((80, 525), "Only attestations from THIS provider will be accepted.", fill=GRAY, font=font_body)
draw.text((80, 555), "Token issuers control who they trust — no vendor lock-in.", fill=GRAY, font=font_body)

draw_subtitle_bar(draw, "Step 4: The token issuer decides which KYC providers to trust — you can add multiple providers")
save(img, "05_kyc_provider.png")

# ==================== FRAME 6: Create Investor Scenarios ====================
img, draw = new_frame()
draw_header(draw, 5, "Onboard Investors")

investors = [
    ("🧑 Alice", "US Accredited Investor", "✅ KYC Verified", "USA (840)", "Accredited", GREEN),
    ("👨 Bob", "EU Institutional Buyer", "✅ KYC Verified", "Germany (276)", "Qualified Purchaser", GREEN),
    ("👤 Charlie", "Unverified Applicant", "❌ Not Verified", "—", "None", RED),
]

y = 170
for name, profile, kyc, country, accred, color in investors:
    draw.rounded_rectangle([50, y, WIDTH-50, y+95], radius=10, fill=DARK_CARD)
    draw.text((80, y+8), name, fill=WHITE, font=font_subtitle)
    draw.text((300, y+12), profile, fill=GRAY, font=font_small)
    draw.text((80, y+45), f"KYC: {kyc}", fill=color, font=font_body)
    draw.text((400, y+45), f"Country: {country}", fill=GRAY, font=font_body)
    draw.text((650, y+45), f"Accreditation: {accred}", fill=GRAY, font=font_body)
    
    if "Not" not in kyc:
        draw.text((80, y+72), "📋 EAS Attestation created  →  View on EAS Explorer", fill=ACCENT, font=font_small)
    else:
        draw.text((80, y+72), "⚠️  No attestation — never passed KYC", fill=RED, font=font_small)
    y += 115

draw_subtitle_bar(draw, "Step 5: KYC provider issues EAS attestations for verified investors — Charlie has none")
save(img, "06_investors.png")

# ==================== FRAME 7: Register Attestations ====================
img, draw = new_frame()
draw_header(draw, 6, "Register Attestations")

draw.rounded_rectangle([50, 180, WIDTH-50, 350], radius=12, fill=DARK_CARD)
draw.text((80, 195), "Link Attestations to Bridge", fill=WHITE, font=font_subtitle)
draw.text((80, 240), "✅  Alice's KYC attestation registered", fill=GREEN, font=font_body)
draw.text((80, 270), "✅  Alice's accreditation attestation registered", fill=GREEN, font=font_body)
draw.text((80, 300), "✅  Bob's KYC attestation registered", fill=GREEN, font=font_body)
draw.text((80, 330), "✅  Bob's accreditation attestation registered", fill=GREEN, font=font_body)

draw.rounded_rectangle([50, 380, WIDTH-50, 500], radius=12, fill="#1a2332")
draw.text((80, 395), "💡  How registration works:", fill=YELLOW, font=font_body)
draw.text((80, 430), "Anyone can register a valid attestation — the contract validates", fill=GRAY, font=font_body)
draw.text((80, 460), "it's real, from a trusted provider, and matches the required schema.", fill=GRAY, font=font_body)

draw_subtitle_bar(draw, "Step 6: Bridge validates and indexes each attestation — connecting EAS to ERC-3643 compliance")
save(img, "07_register.png")

# ==================== FRAME 8: Verify — THE PAYOFF ====================
img, draw = new_frame()
draw_header(draw, 7, "Verify Investor Eligibility")

draw.text((WIDTH//2 - 100, 160), "THE PAYOFF", fill=YELLOW, font=font_subtitle)

y = 210
# Alice - ELIGIBLE
draw.rounded_rectangle([50, y, WIDTH-50, y+90], radius=12, fill="#14532d")
draw.text((80, y+10), "🧑 Alice — US Accredited", fill=WHITE, font=font_subtitle)
draw.text((80, y+50), "isVerified(alice) →", fill=GRAY, font=font_body)
draw.text((340, y+45), "✅ ELIGIBLE", fill=GREEN, font=font_step)
draw.text((600, y+50), "Can trade the token", fill=GRAY, font=font_body)

y += 110
# Bob - ELIGIBLE
draw.rounded_rectangle([50, y, WIDTH-50, y+90], radius=12, fill="#14532d")
draw.text((80, y+10), "👨 Bob — EU Institutional", fill=WHITE, font=font_subtitle)
draw.text((80, y+50), "isVerified(bob)   →", fill=GRAY, font=font_body)
draw.text((340, y+45), "✅ ELIGIBLE", fill=GREEN, font=font_step)
draw.text((600, y+50), "Can trade the token", fill=GRAY, font=font_body)

y += 110
# Charlie - NOT ELIGIBLE
draw.rounded_rectangle([50, y, WIDTH-50, y+90], radius=12, fill="#7f1d1d")
draw.text((80, y+10), "👤 Charlie — Unverified", fill=WHITE, font=font_subtitle)
draw.text((80, y+50), "isVerified(charlie) →", fill=GRAY, font=font_body)
draw.text((340, y+45), "❌ NOT ELIGIBLE", fill=RED, font=font_step)
draw.text((600, y+50), "Transfer blocked", fill=GRAY, font=font_body)

draw.text((80, y+120), "Each result is a LIVE on-chain call — this is what the token contract checks during transfers", fill=ACCENT, font=font_small)

draw_subtitle_bar(draw, "Step 7: Live on-chain verification — ERC-3643 compliance now works with EAS attestations")
save(img, "08_verify.png")

# ==================== FRAME 9: Revocation ====================
img, draw = new_frame()
draw_header(draw, 8, "Revoke & Re-Verify")

draw.text((80, 180), "Scenario: Bob fails AML re-check", fill=YELLOW, font=font_subtitle)

# Before
draw.rounded_rectangle([50, 230, WIDTH//2-15, 370], radius=12, fill=DARK_CARD)
draw.text((80, 245), "BEFORE", fill=GRAY, font=font_subtitle)
draw.text((80, 285), "👨 Bob", fill=WHITE, font=font_body)
draw.text((80, 320), "✅ ELIGIBLE", fill=GREEN, font=font_step)

# Arrow
draw.text((WIDTH//2-10, 290), "→", fill=YELLOW, font=get_font(40))

# After
draw.rounded_rectangle([WIDTH//2+15, 230, WIDTH-50, 370], radius=12, fill="#7f1d1d")
draw.text((WIDTH//2+45, 245), "AFTER REVOCATION", fill=RED, font=font_subtitle)
draw.text((WIDTH//2+45, 285), "👨 Bob", fill=WHITE, font=font_body)
draw.text((WIDTH//2+45, 320), "❌ NOT ELIGIBLE", fill=RED, font=font_step)

draw.text((80, 400), "What happened:", fill=WHITE, font=font_subtitle)
draw.text((80, 440), "1. KYC provider calls EAS.revoke(bob's attestation)", fill=GRAY, font=font_body)
draw.text((80, 470), "2. Bridge immediately sees attestation is revoked", fill=GRAY, font=font_body)
draw.text((80, 500), "3. isVerified(bob) now returns FALSE", fill=GRAY, font=font_body)
draw.text((80, 530), "4. Bob is blocked from trading — instantly, automatically", fill=GRAY, font=font_body)

draw.rounded_rectangle([50, 570, WIDTH-50, 630], radius=10, fill="#1a2332")
draw.text((80, 580), "🔑  This is how regulated securities MUST work — and now it works with EAS.", fill=YELLOW, font=font_body)

draw_subtitle_bar(draw, "Step 8: Real-time compliance enforcement — revoke an attestation, investor is immediately blocked")
save(img, "09_revoke.png")

# ==================== FRAME 10: Summary ====================
img, draw = new_frame()

draw.text((WIDTH//2 - 200, 80), "What We Just Proved", fill=WHITE, font=font_title)

y = 160
points = [
    ("✅", "ERC-3643 compliance works with EAS attestations"),
    ("✅", "Any EAS-compatible KYC provider can be trusted"),
    ("✅", "Investors reuse attestations across tokens & chains"),
    ("✅", "Revocation is instant — real-time enforcement"),
    ("✅", "Zero changes to the ERC-3643 token contract"),
    ("✅", "Works on Ethereum, Base, Arbitrum, Optimism"),
]
for check, text in points:
    draw.text((80, y), check, fill=GREEN, font=font_subtitle)
    draw.text((120, y+2), text, fill=WHITE, font=font_body)
    y += 45

draw.text((80, y+30), "Try it yourself:", fill=ACCENT, font=font_subtitle)
draw.text((80, y+70), "claudyfaucant.github.io/eas-erc3643-bridge-demo", fill=WHITE, font=font_body)
draw.text((80, y+105), "github.com/claudyfaucant/eas-erc3643-bridge", fill=WHITE, font=font_body)

draw.text((WIDTH//2 - 150, y+160), "Enterprise Ethereum Alliance", fill=GRAY, font=font_subtitle)

draw_subtitle_bar(draw, "Open source — MIT License — Built by the EEA")
save(img, "10_summary.png")

print(f"\n✅ All frames built in {FRAMES_DIR}/")

# ==================== BUILD VIDEO ====================
print("\nBuilding video...")

# Each frame shows for different durations (in seconds)
durations = [4, 6, 4, 4, 4, 5, 5, 4, 6, 6, 5]
frame_files = sorted([f for f in os.listdir(FRAMES_DIR) if f.endswith('.png')])

# Build concat file for ffmpeg
concat_path = os.path.join(OUTPUT_DIR, "concat.txt")
with open(concat_path, "w") as f:
    for frame_file, duration in zip(frame_files, durations):
        f.write(f"file 'frames/{frame_file}'\n")
        f.write(f"duration {duration}\n")
    # Last frame needs to be repeated for ffmpeg concat
    f.write(f"file 'frames/{frame_files[-1]}'\n")

output_path = os.path.join(OUTPUT_DIR, "eas-erc3643-bridge-demo.mp4")

cmd = [
    os.path.expanduser("~/.local/bin/ffmpeg"),
    "-y",
    "-f", "concat",
    "-safe", "0",
    "-i", concat_path,
    "-vf", "scale=1280:720,format=yuv420p",
    "-c:v", "libx264",
    "-preset", "medium",
    "-crf", "23",
    "-r", "30",
    output_path
]

result = subprocess.run(cmd, capture_output=True, text=True, cwd=OUTPUT_DIR)
if result.returncode == 0:
    size_mb = os.path.getsize(output_path) / (1024 * 1024)
    print(f"✅ Video built: {output_path} ({size_mb:.1f} MB)")
else:
    print(f"❌ ffmpeg error: {result.stderr[-500:]}")
