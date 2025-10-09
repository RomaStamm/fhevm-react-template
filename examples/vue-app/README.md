# Vue 3 Example - FHEVM SDK Integration

This example demonstrates how to integrate the FHEVM SDK in a Vue 3 application using Composition API and composables.

## Features

- ✅ Vue 3 with Composition API
- ✅ Vue Router for navigation
- ✅ Pinia for state management
- ✅ FHE encryption composables
- ✅ TypeScript support
- ✅ Tailwind CSS styling
- ✅ Vite for fast development

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
vue-app/
├── src/
│   ├── main.ts              # Application entry point
│   ├── App.vue              # Root component with FHEVM provider
│   ├── router/
│   │   └── index.ts         # Vue Router configuration
│   ├── views/
│   │   ├── HomeView.vue     # Home page
│   │   ├── EncryptView.vue  # Encryption example
│   │   └── DecryptView.vue  # Decryption example
│   ├── components/
│   │   ├── EncryptCard.vue  # Encryption card component
│   │   └── DecryptCard.vue  # Decryption card component
│   └── assets/
│       └── main.css         # Global styles with Tailwind
├── vite.config.ts           # Vite configuration
├── tailwind.config.js       # Tailwind configuration
└── tsconfig.json            # TypeScript configuration
```

## Usage Examples

### Setting up FHEVM Provider

In your root component (`App.vue`):

```vue
<script setup lang="ts">
import { provideFHEVM } from '@fhevm/sdk/vue';

const config = {
  contractAddress: import.meta.env.VITE_CONTRACT_ADDRESS,
  network: 'sepolia',
};

const { isInitialized, isInitializing, error } = provideFHEVM(config);
</script>

<template>
  <div v-if="isInitialized">
    <RouterView />
  </div>
  <div v-else-if="isInitializing">
    Loading...
  </div>
</template>
```

### Using Encryption Composable

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { useEncrypt } from '@fhevm/sdk/vue';

const { encrypt, isEncrypting, error } = useEncrypt();
const value = ref(42);

async function handleEncrypt() {
  try {
    const encrypted = await encrypt(value.value);
    console.log('Encrypted:', encrypted);
  } catch (err) {
    console.error('Encryption failed:', err);
  }
}
</script>

<template>
  <div>
    <input v-model.number="value" type="number" />
    <button @click="handleEncrypt" :disabled="isEncrypting">
      {{ isEncrypting ? 'Encrypting...' : 'Encrypt' }}
    </button>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>
```

### Using Decryption Composable

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { useDecrypt } from '@fhevm/sdk/vue';
import type { EncryptedValue } from '@fhevm/sdk/types';

const { decrypt, isDecrypting, error } = useDecrypt();
const encryptedValue = ref<EncryptedValue | null>(null);
const decryptedValue = ref<number | null>(null);

async function handleDecrypt() {
  if (!encryptedValue.value) return;

  try {
    const result = await decrypt(encryptedValue.value);
    decryptedValue.value = result.value;
  } catch (err) {
    console.error('Decryption failed:', err);
  }
}
</script>

<template>
  <div>
    <button @click="handleDecrypt" :disabled="isDecrypting || !encryptedValue">
      {{ isDecrypting ? 'Decrypting...' : 'Decrypt' }}
    </button>
    <p v-if="decryptedValue">Decrypted: {{ decryptedValue }}</p>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>
```

## Environment Variables

Create a `.env.local` file:

```env
VITE_CONTRACT_ADDRESS=0x...
VITE_NETWORK=sepolia
VITE_GATEWAY_URL=https://gateway.zama.ai
```

## Available Composables

### `provideFHEVM(config)`
Provides FHEVM client to child components. Use this in your root component.

**Returns:**
- `isInitialized`: Reactive ref indicating if SDK is ready
- `isInitializing`: Reactive ref indicating if SDK is initializing
- `error`: Reactive ref containing any initialization errors

### `useFHEVM()`
Access the FHEVM client in child components.

**Returns:**
- `client`: FHEVM client instance
- `isInitialized`: Readonly ref for initialization status
- `error`: Readonly ref for errors

### `useEncrypt()`
Composable for encrypting values.

**Returns:**
- `encrypt(value)`: Function to encrypt a number
- `isEncrypting`: Readonly ref indicating encryption status
- `error`: Readonly ref for encryption errors
- `resetError()`: Function to reset error state

### `useDecrypt()`
Composable for decrypting values.

**Returns:**
- `decrypt(encrypted, isPublic?)`: Function to decrypt encrypted value
- `isDecrypting`: Readonly ref indicating decryption status
- `error`: Readonly ref for decryption errors
- `resetError()`: Function to reset error state

## Building for Production

```bash
# Type check
npm run type-check

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

```bash
# Build
npm run build

# Deploy the dist/ folder to your hosting service
# (Vercel, Netlify, etc.)
```

## Learn More

- [FHEVM SDK Documentation](../../packages/fhevm-sdk/README.md)
- [Vue 3 Documentation](https://vuejs.org/)
- [Zama FHEVM](https://docs.zama.ai/fhevm)
- [Composition API Guide](https://vuejs.org/guide/extras/composition-api-faq.html)
