# Next.js Example - FHEVM SDK Integration

This example demonstrates how to integrate the FHEVM SDK in a Next.js 14+ application with App Router.

## Features

- ✅ Next.js 14 App Router
- ✅ Server and Client Components
- ✅ FHE encryption in forms
- ✅ Real-time decryption
- ✅ Wallet connection (RainbowKit)
- ✅ TypeScript support
- ✅ Tailwind CSS styling

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## Project Structure

```
nextjs-app/
├── app/
│   ├── layout.tsx          # Root layout with FHEVMProvider
│   ├── page.tsx            # Home page
│   └── examples/
│       ├── encrypt/        # Encryption example
│       ├── decrypt/        # Decryption example
│       └── voting/         # Complete voting dApp
├── components/
│   ├── EncryptForm.tsx     # Form with FHE encryption
│   ├── DecryptDisplay.tsx  # Display decrypted values
│   └── WalletConnect.tsx   # Wallet connection component
└── lib/
    └── config.ts           # FHEVM configuration
```

## Usage Examples

### Basic Encryption

```typescript
'use client';

import { useEncrypt } from '@fhevm/sdk/react';

export function EncryptForm() {
  const { encrypt, isEncrypting } = useEncrypt();

  const handleSubmit = async (value: number) => {
    const encrypted = await encrypt(value);
    // Use encrypted value in contract call
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleSubmit(42);
    }}>
      <button disabled={isEncrypting}>
        {isEncrypting ? 'Encrypting...' : 'Submit'}
      </button>
    </form>
  );
}
```

### With Decryption

```typescript
'use client';

import { useEncrypt, useDecrypt } from '@fhevm/sdk/react';
import { useState } from 'react';

export function EncryptDecrypt() {
  const { encrypt } = useEncrypt();
  const { decrypt } = useDecrypt();
  const [encryptedValue, setEncryptedValue] = useState(null);
  const [decryptedValue, setDecryptedValue] = useState(null);

  const handleEncrypt = async (value: number) => {
    const encrypted = await encrypt(value);
    setEncryptedValue(encrypted);
  };

  const handleDecrypt = async () => {
    if (encryptedValue) {
      const decrypted = await decrypt(encryptedValue);
      setDecryptedValue(decrypted);
    }
  };

  return (
    <div>
      <button onClick={() => handleEncrypt(42)}>Encrypt</button>
      <button onClick={handleDecrypt}>Decrypt</button>
      {decryptedValue && <p>Decrypted: {decryptedValue}</p>}
    </div>
  );
}
```

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_NETWORK=sepolia
NEXT_PUBLIC_INFURA_KEY=your_infura_key
```

## Deployment

```bash
# Build for production
npm run build

# Deploy to Vercel
vercel deploy
```

## Learn More

- [FHEVM SDK Documentation](../../packages/fhevm-sdk/README.md)
- [Next.js Documentation](https://nextjs.org/docs)
- [Zama FHEVM](https://docs.zama.ai/fhevm)
