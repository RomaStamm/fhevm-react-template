# @fhevm/sdk

**Universal SDK for building confidential dApps with Fully Homomorphic Encryption**

## Features

- 🔧 **Framework Agnostic** - Works with React, Vue, Next.js, Node.js, or vanilla JS
- 📦 **All-in-One** - Single package with all FHEVM dependencies
- 🎨 **Wagmi-like API** - Familiar hooks and composables for Web3 developers
- ⚡ **Type Safe** - Full TypeScript support
- 🔐 **FHE Ready** - Built-in encryption/decryption following Zama's SDK
- 📚 **Well Documented** - Comprehensive API reference

## Installation

```bash
npm install @fhevm/sdk
```

## Quick Start

### React/Next.js

```typescript
import { FHEVMProvider, useEncrypt, useDecrypt } from '@fhevm/sdk/react';

function App() {
  return (
    <FHEVMProvider contractAddress="0x...">
      <YourComponent />
    </FHEVMProvider>
  );
}

function YourComponent() {
  const { encrypt, isEncrypting } = useEncrypt();
  const { decrypt, isDecrypting } = useDecrypt();

  const handleSubmit = async (value: number) => {
    const encrypted = await encrypt(value);
    // Use encrypted value in contract call
  };

  return <button onClick={() => handleSubmit(42)}>Submit</button>;
}
```

### Vue 3

```typescript
import { createFHEVM, useEncrypt, useDecrypt } from '@fhevm/sdk/vue';

// In main.ts
const app = createApp(App);
app.use(createFHEVM({ contractAddress: '0x...' }));

// In component
const { encrypt } = useEncrypt();
const { decrypt } = useDecrypt();

const handleSubmit = async (value: number) => {
  const encrypted = await encrypt(value);
  // Use encrypted value
};
```

### Node.js

```typescript
import { FHEVMClient } from '@fhevm/sdk';

const client = new FHEVMClient({
  contractAddress: '0x...',
  network: 'sepolia',
  provider: 'https://sepolia.infura.io/v3/YOUR_KEY'
});

await client.init();

const encrypted = await client.encrypt(42);
const decrypted = await client.decrypt(encrypted);
```

## API Reference

### Core Client

#### `FHEVMClient`

```typescript
class FHEVMClient {
  constructor(config: FHEVMConfig);
  init(): Promise<void>;
  encrypt(value: number | bigint): Promise<EncryptedValue>;
  decrypt(encrypted: EncryptedValue): Promise<number>;
  userDecrypt(encrypted: EncryptedValue): Promise<number>;
  publicDecrypt(encrypted: EncryptedValue): Promise<number>;
}
```

### React Hooks

#### `useFHEVM()`

```typescript
function useFHEVM(): {
  isInitialized: boolean;
  isInitializing: boolean;
  error: Error | null;
  client: FHEVMClient | null;
}
```

#### `useEncrypt()`

```typescript
function useEncrypt(): {
  encrypt: (value: number | bigint) => Promise<EncryptedValue>;
  isEncrypting: boolean;
  error: Error | null;
}
```

#### `useDecrypt()`

```typescript
function useDecrypt(): {
  decrypt: (encrypted: EncryptedValue) => Promise<number>;
  userDecrypt: (encrypted: EncryptedValue) => Promise<number>;
  publicDecrypt: (encrypted: EncryptedValue) => Promise<number>;
  isDecrypting: boolean;
  error: Error | null;
}
```

### Vue Composables

#### `useEncrypt()`

```typescript
function useEncrypt(): {
  encrypt: (value: Ref<number> | number) => Promise<EncryptedValue>;
  isEncrypting: Ref<boolean>;
  error: Ref<Error | null>;
}
```

#### `useDecrypt()`

```typescript
function useDecrypt(): {
  decrypt: (encrypted: EncryptedValue) => Promise<number>;
  isDecrypting: Ref<boolean>;
  error: Ref<Error | null>;
}
```

## Types

```typescript
interface FHEVMConfig {
  contractAddress: string;
  network?: 'sepolia' | 'mainnet' | 'localhost';
  provider?: string;
  aclAddress?: string;
}

interface EncryptedValue {
  data: Uint8Array;
  signature: string;
}

interface DecryptionResult {
  value: number;
  proof?: string;
}
```

## Examples

See the [examples directory](../../examples/) for complete applications:

- **Next.js App** - Full-featured Next.js 14 application
- **Vue App** - Vue 3 with Composition API
- **Node.js App** - Backend service with FHE
- **Literature Review** - Complete production dApp

## License

MIT
