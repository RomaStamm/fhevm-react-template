import { ref, readonly } from 'vue';
import { useFHEVM } from './useFHEVM';
import type { EncryptedValue, DecryptionResult } from '../types';

export interface UseDecryptResult {
  decrypt: (encrypted: EncryptedValue, isPublic?: boolean) => Promise<DecryptionResult>;
  isDecrypting: Readonly<import('vue').Ref<boolean>>;
  error: Readonly<import('vue').Ref<string | null>>;
  resetError: () => void;
}

/**
 * Vue composable for decrypting values using FHEVM
 *
 * @example
 * ```vue
 * <script setup>
 * import { useDecrypt } from '@fhevm/sdk/vue';
 * import { ref } from 'vue';
 *
 * const { decrypt, isDecrypting, error } = useDecrypt();
 * const encryptedValue = ref(null);
 * const decryptedValue = ref(null);
 *
 * async function handleDecrypt() {
 *   if (encryptedValue.value) {
 *     const result = await decrypt(encryptedValue.value);
 *     decryptedValue.value = result.value;
 *   }
 * }
 * </script>
 *
 * <template>
 *   <div>
 *     <button @click="handleDecrypt" :disabled="isDecrypting || !encryptedValue">
 *       {{ isDecrypting ? 'Decrypting...' : 'Decrypt' }}
 *     </button>
 *     <p v-if="decryptedValue">Decrypted: {{ decryptedValue }}</p>
 *     <p v-if="error" class="error">{{ error }}</p>
 *   </div>
 * </template>
 * ```
 */
export function useDecrypt(): UseDecryptResult {
  const { client, isInitialized } = useFHEVM();
  const isDecrypting = ref(false);
  const error = ref<string | null>(null);

  const decrypt = async (
    encrypted: EncryptedValue,
    isPublic: boolean = false
  ): Promise<DecryptionResult> => {
    if (!isInitialized.value) {
      throw new Error('FHEVM client is not initialized yet. Please wait for initialization to complete.');
    }

    if (isDecrypting.value) {
      throw new Error('A decryption operation is already in progress. Please wait for it to complete.');
    }

    isDecrypting.value = true;
    error.value = null;

    try {
      const result = isPublic
        ? await client.publicDecrypt(encrypted)
        : await client.userDecrypt(encrypted);

      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Decryption failed';
      error.value = errorMessage;
      throw new Error(errorMessage);
    } finally {
      isDecrypting.value = false;
    }
  };

  const resetError = () => {
    error.value = null;
  };

  return {
    decrypt,
    isDecrypting: readonly(isDecrypting),
    error: readonly(error),
    resetError,
  };
}
