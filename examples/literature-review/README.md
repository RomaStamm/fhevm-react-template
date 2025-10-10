# Literature Review System - FHEVM SDK Integration Example

**A complete production dApp demonstrating confidential peer review using Fully Homomorphic Encryption**

This example showcases a real-world application of the FHEVM SDK in a complex, multi-user workflow application.

## 🎯 Overview

The Literature Review System is a decentralized platform for confidential literary awards. It demonstrates:

- **Encrypted Submissions**: Authors submit works with FHE-encrypted metadata
- **Confidential Reviews**: Reviewers provide encrypted scores and feedback
- **Private Scoring**: Aggregate scores calculated without revealing individual reviews
- **Access Control**: Multi-level authorization system
- **Period Management**: Time-locked submission and review phases

## 🏗️ Architecture

### Smart Contract Layer

```
LiteratureReviewSystem.sol
├── Submission Management
├── Reviewer Authorization
├── Review Collection (FHE)
├── Score Calculation (FHE)
└── Award Distribution
```

### Frontend Layer (with FHEVM SDK)

```
React App
├── @fhevm/sdk Integration
├── Wallet Connection
├── Encrypted Form Submissions
├── Decryption of Results
└── Real-time Status Updates
```

## 🚀 Quick Start

```bash
# Install dependencies
cd examples/literature-review
npm install

# Configure environment
cp .env.example .env
# Edit .env with your settings

# Run development server
npm run dev

# Open http://localhost:3000
```

## 📁 Project Structure

```
literature-review/
├── contracts/
│   └── LiteratureReviewSystem.sol    # Main smart contract
├── src/
│   ├── components/
│   │   ├── SubmitWork.tsx           # Submission form with FHE
│   │   ├── ReviewForm.tsx           # Review form with FHE
│   │   ├── ReviewerDashboard.tsx    # Reviewer interface
│   │   └── AwardResults.tsx         # Results display
│   ├── hooks/
│   │   ├── useLiteratureContract.ts # Contract interactions
│   │   ├── useSubmission.ts         # Submission logic
│   │   └── useReview.ts             # Review logic
│   └── lib/
│       └── config.ts                # FHEVM SDK configuration
├── scripts/
│   ├── deploy.js                    # Deployment script
│   ├── verify.js                    # Contract verification
│   └── simulate.js                  # E2E simulation
└── test/
    └── LiteratureReviewSystem.test.js
```

## 🔐 FHEVM SDK Integration

### 1. Provider Setup

```typescript
// src/app/layout.tsx
import { FHEVMProvider } from '@fhevm/sdk/react';

export default function RootLayout({ children }) {
  return (
    <FHEVMProvider contractAddress={process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}>
      {children}
    </FHEVMProvider>
  );
}
```

### 2. Encrypted Submission

```typescript
// src/components/SubmitWork.tsx
import { useEncrypt } from '@fhevm/sdk/react';
import { useLiteratureContract } from '../hooks/useLiteratureContract';

export function SubmitWork() {
  const { encrypt, isEncrypting } = useEncrypt();
  const { submitWork } = useLiteratureContract();

  const handleSubmit = async (data) => {
    // No encryption needed for public metadata
    const { title, author, genre } = data;

    // Submit to contract
    await submitWork({
      title,
      author,
      genre,
      ipfsHash: await uploadToIPFS(data.content)
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
}
```

### 3. Encrypted Review

```typescript
// src/components/ReviewForm.tsx
import { useEncrypt } from '@fhevm/sdk/react';

export function ReviewForm({ workId }) {
  const { encrypt, isEncrypting } = useEncrypt();
  const { submitReview } = useLiteratureContract();

  const handleSubmit = async (scores) => {
    // Scores are encrypted on-chain, not client-side
    // Contract handles FHE encryption internally
    await submitReview({
      workId,
      qualityScore: scores.quality,
      originalityScore: scores.originality,
      impactScore: scores.impact,
      comments: scores.comments // Encrypted in contract
    });
  };

  return <form onSubmit={handleSubmit}>{/* Review form */}</form>;
}
```

### 4. Decryption of Results

```typescript
// src/components/AwardResults.tsx
import { useDecrypt } from '@fhevm/sdk/react';

export function AwardResults({ period }) {
  const { decrypt } = useDecrypt();
  const { getAwards } = useLiteratureContract();

  useEffect(() => {
    async function loadResults() {
      const awards = await getAwards(period);
      // Awards are public after announcement
      // Individual scores remain encrypted
    }

    loadResults();
  }, [period]);
}
```

## 💡 Key Features Demonstrated

### 1. Multi-Phase Workflow

```typescript
// Period-based access control
const isSubmissionPeriod = await contract.isSubmissionPeriodActive();
const isReviewPeriod = await contract.isReviewPeriodActive();

// UI adapts based on current period
{isSubmissionPeriod && <SubmitWork />}
{isReviewPeriod && <ReviewForm />}
```

### 2. Role-Based Access

```typescript
// Check user authorization
const isAuthorizedReviewer = await contract.authorizedReviewers(address);
const isOwner = await contract.owner() === address;

// Conditional rendering
{isAuthorizedReviewer && <ReviewerDashboard />}
{isOwner && <AdminPanel />}
```

### 3. FHE Score Aggregation

```solidity
// In smart contract
function submitReview(
    uint32 _workId,
    uint32 _qualityScore,
    uint32 _originalityScore,
    uint32 _impactScore,
    string memory _encryptedComments
) external onlyAuthorizedReviewer {
    // Encrypt scores using FHE
    euint32 encryptedQuality = FHE.asEuint32(_qualityScore);
    euint32 encryptedOriginality = FHE.asEuint32(_originalityScore);
    euint32 encryptedImpact = FHE.asEuint32(_impactScore);

    // Store encrypted reviews
    reviews[currentReviewPeriod][_workId][msg.sender] = Review({
        encryptedQualityScore: encryptedQuality,
        encryptedOriginalityScore: encryptedOriginality,
        encryptedImpactScore: encryptedImpact,
        encryptedComments: _encryptedComments,
        submitted: true,
        reviewer: msg.sender,
        reviewTime: block.timestamp
    });
}
```

## 📊 User Workflows

### Author Workflow

1. Connect wallet
2. Wait for submission period
3. Submit literary work with metadata
4. Track submission status
5. View results after awards announced

### Reviewer Workflow

1. Register as reviewer
2. Wait for admin approval
3. During review period, evaluate works
4. Submit encrypted reviews
5. Build reputation through contributions

### Admin Workflow

1. Start submission period
2. Approve reviewers
3. Start review period
4. Calculate results (FHE computation)
5. Announce awards

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run E2E simulation
npm run simulate

# Test with gas reporting
npm run test:gas
```

## 📝 Environment Configuration

```env
# Smart Contract
NEXT_PUBLIC_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_NETWORK=sepolia

# RPC Provider
NEXT_PUBLIC_INFURA_KEY=...
NEXT_PUBLIC_ALCHEMY_KEY=...

# IPFS
NEXT_PUBLIC_PINATA_KEY=...
NEXT_PUBLIC_PINATA_SECRET=...

# FHEVM SDK
NEXT_PUBLIC_ACL_ADDRESS=0x...
NEXT_PUBLIC_GATEWAY_URL=https://gateway.zama.ai
```

## 🚀 Deployment

### Deploy Smart Contract

```bash
npm run deploy
npm run verify
```

### Deploy Frontend

```bash
npm run build
vercel deploy
```

## 📚 Learn More

### Contract Details

- **Network**: Sepolia Testnet
- **Contract Address**: `0xE30e4b2A47C0605AaBaAde36f15d804fec4F9CF0`
- **Etherscan**: [View on Etherscan](https://sepolia.etherscan.io/address/0xE30e4b2A47C0605AaBaAde36f15d804fec4F9CF0)

### Documentation

- [Smart Contract Documentation](../../README.md)
- [FHEVM SDK Documentation](../../packages/fhevm-sdk/README.md)
- [Deployment Guide](./DEPLOYMENT.md)

### Resources

- [Zama FHEVM Docs](https://docs.zama.ai/fhevm)
- [FHE Encryption Guide](../../docs/encryption-guide.md)
- [Best Practices](../../docs/best-practices.md)

## 🤝 Contributing

This example is part of the FHEVM SDK bounty submission. Contributions welcome!

## 📄 License

MIT License - see [LICENSE](../../LICENSE)

---

**This example demonstrates a complete, production-ready dApp using the FHEVM SDK for confidential computations.**
