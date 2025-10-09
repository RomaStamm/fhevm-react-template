<script setup lang="ts">
import { ref } from 'vue';
import { useEncrypt } from '@fhevm/sdk/vue';
import type { EncryptedValue } from '@fhevm/sdk/types';

const emit = defineEmits<{
  encrypted: [value: EncryptedValue]
}>();

const { encrypt, isEncrypting, error, resetError } = useEncrypt();
const inputValue = ref<number>(42);
const localError = ref<string>('');

const handleSubmit = async () => {
  localError.value = '';
  resetError();

  // Validation
  if (inputValue.value < 0) {
    localError.value = 'Please enter a positive number';
    return;
  }

  try {
    const encrypted = await encrypt(inputValue.value);
    emit('encrypted', encrypted);

    // Show success feedback
    console.log('Encryption successful:', encrypted);
  } catch (err) {
    localError.value = err instanceof Error ? err.message : 'Encryption failed';
  }
};
</script>

<template>
  <div class="bg-white rounded-lg shadow-lg p-6">
    <h2 class="text-2xl font-semibold text-gray-800 mb-4">
      Encrypt Data
    </h2>
    <p class="text-gray-600 mb-6">
      Enter a number to encrypt it using Fully Homomorphic Encryption.
    </p>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label for="value" class="block text-sm font-medium text-gray-700 mb-2">
          Value to Encrypt
        </label>
        <input
          id="value"
          v-model.number="inputValue"
          type="number"
          placeholder="Enter a number (e.g., 42)"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          :disabled="isEncrypting"
        />
      </div>

      <!-- Error Display -->
      <div
        v-if="localError || error"
        class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg"
      >
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
          <span class="text-sm">{{ localError || error }}</span>
        </div>
      </div>

      <button
        type="submit"
        :disabled="isEncrypting"
        class="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        <svg
          v-if="isEncrypting"
          class="animate-spin h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <svg
          v-else
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        <span>{{ isEncrypting ? 'Encrypting...' : 'Encrypt Value' }}</span>
      </button>

      <!-- Info Box -->
      <div class="text-xs text-gray-500 bg-blue-50 border border-blue-200 rounded-lg p-3">
        <p class="font-medium text-blue-900 mb-1">How it works:</p>
        <ul class="list-disc list-inside space-y-1 ml-2 text-blue-800">
          <li>Value is encrypted using FHE on the client side</li>
          <li>Encrypted data is signed with your wallet (EIP-712)</li>
          <li>Can be used in smart contracts without decryption</li>
        </ul>
      </div>
    </form>
  </div>
</template>
