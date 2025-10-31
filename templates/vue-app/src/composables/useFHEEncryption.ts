/**
 * FHE Encryption Composable
 * Enhanced encryption composable with validation and error handling
 */

import { ref, computed } from 'vue';
import { useEncrypt } from '@fhevm/sdk/vue';

export function useFHEEncryption() {
  const { encrypt, isInitialized } = useEncrypt();
  const isEncrypting = ref(false);
  const error = ref<string | null>(null);
  const encryptedValue = ref<any>(null);

  const encryptValue = async (value: number) => {
    error.value = null;
    isEncrypting.value = true;

    try {
      if (!isInitialized.value) {
        throw new Error('FHE SDK not initialized');
      }

      if (typeof value !== 'number' || isNaN(value)) {
        throw new Error('Value must be a valid number');
      }

      const encrypted = await encrypt(value);
      encryptedValue.value = encrypted;

      return encrypted;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Encryption failed';
      error.value = errorMessage;
      throw err;
    } finally {
      isEncrypting.value = false;
    }
  };

  const reset = () => {
    encryptedValue.value = null;
    error.value = null;
    isEncrypting.value = false;
  };

  return {
    encrypt: encryptValue,
    isEncrypting: computed(() => isEncrypting.value),
    error: computed(() => error.value),
    encryptedValue: computed(() => encryptedValue.value),
    isInitialized,
    reset
  };
}
