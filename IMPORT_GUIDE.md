# Import Guide: Literature Review System Example

This guide explains how the Literature Review System from `D:\` has been imported and integrated as an example application.

## 📁 Files to Import

### Essential Files

Copy these files from `D:\` to `examples/literature-review`:

#### Smart Contract
```bash
cp D:/contracts/LiteratureReviewSystem.sol \
   examples/literature-review/contracts/
```

#### Scripts
```bash
cp D:/scripts/deploy.js \
   examples/literature-review/scripts/

cp D:/scripts/verify.js \
   examples/literature-review/scripts/

cp D:/scripts/interact.js \
   examples/literature-review/scripts/

cp D:/scripts/simulate.js \
   examples/literature-review/scripts/
```

#### Tests
```bash
cp D:/test/LiteratureReviewSystem.test.js \
   examples/literature-review/test/
```

#### Configuration
```bash
cp D:/hardhat.config.js \
   examples/literature-review/

cp D:/.env.example \
   examples/literature-review/
```

#### Documentation
```bash
cp D:/DEPLOYMENT.md \
   examples/literature-review/

cp D:/SECURITY.md \
   examples/literature-review/

cp D:/PERFORMANCE.md \
   examples/literature-review/
```

### Optional Files

```bash
# Git configuration (if needed)
cp D:/.gitignore \
   examples/literature-review/

# Linting configuration
cp D:/.solhint.json \
   examples/literature-review/

cp D:/.prettierrc.json \
   examples/literature-review/
```

## 🔧 Modifications Required

### 1. Update package.json

Create a new `examples/literature-review/package.json`:

```json
{
  "name": "literature-review-system-example",
  "version": "1.0.0",
  "description": "Literature Review System - FHEVM SDK Integration Example",
  "scripts": {
    "compile": "hardhat compile",
    "test": "hardhat test",
    "deploy": "hardhat run scripts/deploy.js --network sepolia",
    "verify": "hardhat run scripts/verify.js --network sepolia",
    "interact": "hardhat run scripts/interact.js --network sepolia",
    "simulate": "hardhat run scripts/simulate.js --network sepolia",
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "@fhevm/sdk": "workspace:*",
    "@fhevm/solidity": "^0.5.0",
    "dotenv": "^16.3.1",
    "ethers": "^6.9.0",
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "hardhat": "^2.19.0",
    "@nomicfoundation/hardhat-toolbox": "^4.0.0",
    "@types/react": "^18.2.0",
    "typescript": "^5.0.0"
  }
}
```

### 2. Add FHEVM SDK Integration

Create frontend integration files:

#### `src/app/layout.tsx`

```typescript
import { FHEVMProvider } from '@fhevm/sdk/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <FHEVMProvider contractAddress={process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}>
          {children}
        </FHEVMProvider>
      </body>
    </html>
  );
}
```

#### `src/components/SubmitWork.tsx`

```typescript
import { useEncrypt } from '@fhevm/sdk/react';
// ... component code
```

### 3. Update Environment Variables

Modify `.env.example` to include SDK configuration:

```env
# Original configuration
PRIVATE_KEY=...
SEPOLIA_RPC_URL=...
ETHERSCAN_API_KEY=...

# Add FHEVM SDK configuration
NEXT_PUBLIC_CONTRACT_ADDRESS=0xE30e4b2A47C0605AaBaAde36f15d804fec4F9CF0
NEXT_PUBLIC_NETWORK=sepolia
NEXT_PUBLIC_ACL_ADDRESS=...
NEXT_PUBLIC_GATEWAY_URL=https://gateway.zama.ai
```

## 🚀 Setup Instructions

### 1. Copy Files

```bash
# From fhevm-react-template root
cd examples/literature-review

# Copy all necessary files (as shown above)
# Or use automated script:
bash ../../scripts/import-literature-review.sh
```

### 2. Install Dependencies

```bash
# From root directory
npm install

# Or from example directory
cd examples/literature-review
npm install
```

### 3. Configure Environment

```bash
cd examples/literature-review
cp .env.example .env
# Edit .env with your settings
```

### 4. Compile Contracts

```bash
npm run compile
```

### 5. Run Tests

```bash
npm test
```

### 6. Deploy (Optional)

```bash
npm run deploy
npm run verify
```

### 7. Start Development Server

```bash
npm run dev
```

## 📝 Integration Points

### Where SDK is Used

1. **Layout Wrapper** (`src/app/layout.tsx`)
   - FHEVMProvider wraps the application

2. **Submission Form** (`src/components/SubmitWork.tsx`)
   - Uses `useEncrypt()` hook for encrypting sensitive data

3. **Review Form** (`src/components/ReviewForm.tsx`)
   - Contract handles FHE encryption internally
   - SDK provides utilities for interaction

4. **Results Display** (`src/components/AwardResults.tsx`)
   - Uses `useDecrypt()` for authorized decryption

## 🎯 Why This Example?

The Literature Review System demonstrates:

### Real-world Complexity
- Multi-user workflows
- Period-based access control
- Role-based permissions
- Complex state management

### FHE Integration
- Encrypted submissions
- Confidential reviews
- Private score aggregation
- Selective disclosure

### SDK Usage
- Provider setup
- Hook usage in components
- Error handling
- Loading states
- Type safety

## 📊 File Structure Comparison

### Original  
```
D:\/
├── contracts/
├── scripts/
├── test/
├── hardhat.config.js
└── package.json
```

### Imported (literature-review)
```
examples/literature-review/
├── contracts/          # Copied from original
├── scripts/            # Copied from original
├── test/               # Copied from original
├── src/                # NEW - Frontend with SDK
│   ├── app/
│   ├── components/
│   └── hooks/
├── hardhat.config.js   # Copied and modified
└── package.json        # NEW - with SDK dependency
```

## 🔄 Keeping in Sync

To update the example with changes from the original:

```bash
# Update smart contract
cp D:/contracts/LiteratureReviewSystem.sol \
   examples/literature-review/contracts/

# Recompile
npm run compile

# Update tests
npm test
```

## ✅ Verification Checklist

After importing, verify:

- [ ] All files copied successfully
- [ ] package.json updated with SDK dependency
- [ ] Environment variables configured
- [ ] Contracts compile without errors
- [ ] Tests pass
- [ ] Frontend integrates SDK correctly
- [ ] Development server starts
 

## 🐛 Common Issues

### "Cannot find module '@fhevm/sdk'"

Install SDK from workspace:
```bash
cd ../../
npm install
```

### "Contract not found"

Compile contracts first:
```bash
npm run compile
```

### "Network not configured"

Check hardhat.config.js network settings match .env

## 📚 Next Steps

1. Review the [example README](examples/literature-review/README.md)
2. Check the [SDK documentation](packages/fhevm-sdk/README.md)
3. Run the example: `npm run dev`
4. Explore the code and customize

---

**Note**: This import process demonstrates how to integrate existing smart contracts with the FHEVM SDK, showing the SDK's flexibility and ease of integration with real-world applications.
