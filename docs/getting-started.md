# Getting Started with FHEVM SDK

This guide will help you integrate the FHEVM SDK into your application in less than 10 minutes.

## Prerequisites

- Node.js 18.x or higher
- npm or yarn
- Basic knowledge of React, Vue, or Node.js
- MetaMask wallet (for frontend examples)
- Sepolia testnet ETH

## Installation

### Option 1: Use the Complete Template

Clone the entire repository with all examples:

```bash
git clone <repository-url>
cd fhevm-react-template
npm install
```

### Option 2: Install SDK Only

Add the SDK to your existing project:

```bash
npm install @fhevm/sdk
```

## Quick Start by Framework

### React / Next.js

**1. Wrap your app with FHEVMProvider**

```typescript
// app/layout.tsx or pages/_app.tsx
import { FHEVMProvider } from '@fhevm/sdk/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <FHEVMProvider contractAddress="0x...">
          {children}
        </FHEVMProvider>
      </body>
    </html>
  );
}
```

**2. Use hooks in your components**

```typescript
// components/EncryptForm.tsx
'use client'; // For Next.js App Router

import { useEncrypt, useDecrypt } from '@fhevm/sdk/react';
import { useState } from 'react';

export function EncryptForm() {
  const { encrypt, isEncrypting } = useEncrypt();
  const { decrypt } = useDecrypt();
  const [value, setValue] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const encrypted = await encrypt(parseInt(value));
    // Use encrypted value in your contract
    console.log('Encrypted:', encrypted);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter a value"
      />
      <button type="submit" disabled={isEncrypting}>
        {isEncrypting ? 'Encrypting...' : 'Encrypt & Submit'}
      </button>
    </form>
  );
}
```

### Vue 3

**1. Install the Vue plugin**

```typescript
// main.ts
import { createApp } from 'vue';
import { createFHEVM } from '@fhevm/sdk/vue';
import App from './App.vue';

const app = createApp(App);

app.use(createFHEVM({
  contractAddress: '0x...',
  network: 'sepolia'
}));

app.mount('#app');
```

**2. Use composables in components**

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { useEncrypt, useDecrypt } from '@fhevm/sdk/vue';

const { encrypt, isEncrypting } = useEncrypt();
const { decrypt } = useDecrypt();

const value = ref(0);
const encrypted = ref(null);

async function handleEncrypt() {
  encrypted.value = await encrypt(value.value);
}
</script>

<template>
  <div>
    <input v-model.number="value" type="number" />
    <button @click="handleEncrypt" :disabled="isEncrypting">
      {{ isEncrypting ? 'Encrypting...' : 'Encrypt' }}
    </button>
  </div>
</template>
```

### Node.js

**1. Initialize the client**

```typescript
// server.ts
import { FHEVMClient } from '@fhevm/sdk';

const client = new FHEVMClient({
  contractAddress: process.env.CONTRACT_ADDRESS,
  network: 'sepolia',
  provider: process.env.RPC_URL
});

await client.init();
```

**2. Use in your API**

```typescript
// api/encrypt.ts
import express from 'express';
import { client } from './server';

const app = express();

app.post('/api/encrypt', async (req, res) => {
  const { value } = req.body;

  try {
    const encrypted = await client.encrypt(value);
    res.json({ encrypted });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000);
```

## Configuration

### Environment Variables

Create a `.env` file:

```env
# Required
CONTRACT_ADDRESS=0x...
NETWORK=sepolia

# Optional
RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY
ACL_ADDRESS=0x...
GATEWAY_URL=https://gateway.zama.ai
```

### TypeScript Configuration

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true
  }
}
```

## Next Steps

- **[API Reference](./api-reference.md)** - Complete API documentation
- **[React Hooks Guide](./react-hooks.md)** - Detailed hooks documentation
- **[Vue Composables Guide](./vue-composables.md)** - Vue-specific features
- **[Encryption Guide](./encryption-guide.md)** - FHE encryption details
- **[Examples](../examples/)** - Complete example applications

## Common Issues

### "Client not initialized"

Make sure to call `init()` or use the provider:

```typescript
// In React
<FHEVMProvider contractAddress="0x...">
  {children}
</FHEVMProvider>

// In Node.js
await client.init();
```

### "No provider available"

Ensure MetaMask is installed (frontend) or provide an RPC URL (backend):

```typescript
const client = new FHEVMClient({
  contractAddress: '0x...',
  provider: 'https://sepolia.infura.io/v3/YOUR_KEY'
});
```

### TypeScript Errors

Install type definitions:

```bash
npm install --save-dev @types/node
```

## Support

- **GitHub Issues**: [Report bugs](https://github.com/username/fhevm-react-template/issues)
- **Discussions**: [Ask questions](https://github.com/username/fhevm-react-template/discussions)
- **Discord**: [Join community](https://discord.gg/zama)

---

**Ready to build?** Check out our [complete examples](../examples/) or dive into the [API reference](./api-reference.md)!
