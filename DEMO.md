# Video Demonstration Guide

## 📹 Demo Video: `demo.mp4`

This video demonstrates the complete setup and usage of the FHEVM SDK across multiple frameworks.

## 🎬 Video Contents

### Part 1: Quick Setup (0:00 - 2:00)
- Clone repository
- Install dependencies with `npm install`
- Configure environment variables
- Start development servers

### Part 2: SDK Overview (2:00 - 5:00)
- SDK architecture explanation
- Framework-agnostic core
- React hooks demonstration
- Vue composables demonstration
- Node.js backend usage

### Part 3: Next.js Example (5:00 - 8:00)
- Setting up FHEVMProvider
- Using useEncrypt hook
- Using useDecrypt hook
- Building a simple voting form
- Wallet connection

### Part 4: Vue Example (8:00 - 11:00)
- Vue plugin installation
- Composables in action
- Reactive encryption/decryption
- TypeScript integration

### Part 5: Node.js Backend (11:00 - 13:00)
- Server-side encryption
- API endpoint creation
- Batch operations
- Performance considerations

### Part 6: Literature Review System (13:00 - 18:00)
- Complete dApp walkthrough
- User registration and authentication
- Encrypted submission process
- Confidential review workflow
- Award calculation with FHE

### Part 7: Design Decisions (18:00 - 20:00)
- Why framework-agnostic architecture
- Wagmi-like API design choices
- Monorepo structure benefits
- Type safety throughout
- Future roadmap

## 🎥 Recording the Demo

### Setup Requirements

1. **Screen Resolution**: 1920x1080 (Full HD)
2. **Recording Software**: OBS Studio / Loom / QuickTime
3. **Audio**: Clear microphone, noise-free environment
4. **Browser**: Latest Chrome with MetaMask installed

### Recording Checklist

- [ ] Clean browser (no extensions except MetaMask)
- [ ] Terminal with clear font (14-16pt)
- [ ] IDE with readable theme and font
- [ ] Test wallet with Sepolia ETH
- [ ] All examples running and tested
- [ ] Script prepared for narration

### Script Outline

```
0:00 - Introduction
"Welcome to the FHEVM SDK demonstration. In this video, I'll show you
how to build confidential dApps with our universal SDK that works across
React, Vue, Next.js, and Node.js."

0:30 - Quick Start
"Let's start by cloning the repository and installing dependencies.
As you can see, it's a monorepo structure with workspaces..."

[Continue with each section]

19:30 - Conclusion
"That's the FHEVM SDK. With less than 10 lines of code, you can add
FHE encryption to any JavaScript application. Check out our documentation
and examples to get started. Thank you for watching!"
```

## 📝 Demo Script Commands

```bash
# Part 1: Setup
git clone <repository-url>
cd fhevm-react-template
npm install
cp .env.example .env
# Edit .env file
npm run dev:next

# Part 2: SDK Structure
cd packages/fhevm-sdk
cat package.json
cat src/core/client.ts
cat src/hooks/useEncrypt.ts

# Part 3: Next.js
cd examples/nextjs-app
npm install
npm run dev
# Open browser to localhost:3000

# Part 4: Vue
cd examples/vue-app
npm install
npm run dev
# Open browser to localhost:5173

# Part 5: Node.js
cd examples/nodejs-app
npm install
npm start
# Test API with curl

# Part 6: Literature Review
cd examples/literature-review
npm install
npm run dev
# Walkthrough complete workflow
```

## 🎨 Visual Elements to Show

### Code Snippets
- FHEVMProvider setup
- useEncrypt hook usage
- useDecrypt hook usage
- Type definitions
- Configuration files

### Browser Demonstrations
- Wallet connection
- Form submission with encryption
- Decryption results
- Transaction confirmations
- Network switching

### Terminal Output
- npm install progress
- Development server logs
- Compilation output
- Test results
- Gas reports

## 🔊 Audio Guidelines

### Tone
- Professional yet friendly
- Clear and measured pace
- Enthusiasm without hype
- Technical but accessible

### Key Points to Emphasize
- "Framework-agnostic"
- "Less than 10 lines of code"
- "Production-ready"
- "Type-safe"
- "Wagmi-like API"

## 📊 Metrics to Highlight

- Setup time: < 2 minutes
- Lines of code to integrate: < 10
- Frameworks supported: 4+
- Example apps included: 4
- Documentation pages: 7+

## 🎯 Target Audience Messages

### For React Developers
"If you know wagmi hooks, you already know our API"

### For Vue Developers
"Composables that feel natural in the Vue ecosystem"

### For Backend Developers
"Same SDK, works on the server with Node.js"

### For All Developers
"Write once, use everywhere - that's our promise"

## 📤 Export Settings

- **Format**: MP4 (H.264)
- **Resolution**: 1920x1080
- **Frame Rate**: 30fps
- **Bitrate**: 5-8 Mbps
- **Audio**: AAC, 192kbps
- **Duration**: 18-20 minutes
- **File Size**: < 500MB

## ✅ Quality Checklist

Before finalizing:
- [ ] Audio levels consistent
- [ ] No background noise
- [ ] All text readable
- [ ] Smooth transitions
- [ ] No dead air/pauses
- [ ] Clear demonstrations
- [ ] Working code examples
- [ ] Professional editing

## 🚀 Upload & Distribution

Once recorded:
1. Upload to YouTube (unlisted)
2. Include in repository as `demo.mp4`
3. Link in main README.md
4. Share in bounty submission
5. Post on social media

## 📎 Additional Resources

Create accompanying materials:
- [ ] Slide deck (PDF)
- [ ] Transcript (TXT/MD)
- [ ] Timestamps (MD)
- [ ] Thumbnail image (PNG)
- [ ] Social media clips (MP4)

---

**Note**: The actual `demo.mp4` file should be placed in the root directory of this repository. Due to file size, it may need to be hosted externally (YouTube, Vimeo) with a link provided here if > 100MB.

**YouTube Link**: [Add link after upload]
**Timestamp Reference**: [Add detailed timestamps after recording]
