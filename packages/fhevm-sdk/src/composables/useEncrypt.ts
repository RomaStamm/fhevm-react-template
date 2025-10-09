import { ref, readonly } from 'vue';
import { useFHEVM } from './useFHEVM';
import type { EncryptedValue } from '../types';

export interface UseEncryptResult {
  encrypt: (value: number | bigint) => Promise<EncryptedValue>;
  isEncrypting: Readonly<import('vue').Ref<boolean>>;
  error: Readonly<import('vue').Ref<string | null>>;
  resetError: () => void;
}

/**
 * Vue composable for encrypting values using FHEVM
 *
 * @example
 * ```vue
 * <script setup>
 * import { useEncrypt } from '@fhevm/sdk/vue';
 * import { ref } from 'vue';
 *
 * const { encrypt, isEncrypting, error } = useEncrypt();
 * const value = ref(42);
 *
 * async function handleEncrypt() {
 *   const encrypted = await encrypt(value.value);
 *   console.log('Encrypted:', encrypted);
 * }
 * </script>
 *
 * <template>
 *   <div>
 *     <input v-model.number="value" type="number" />
 *     <button @click="handleEncrypt" :disabled="isEncrypting">
 *       {{ isEncrypting ? 'Encrypting...' : 'Encrypt' }}
 *     </button>
 *     <p v-if="error" class="error">{{ error }}</p>
 *   </div>
 * </template>
 * ```
 */
export function useEncrypt(): UseEncryptResult {
  const { client, isInitialized } = useFHEVM();
  const isEncrypting = ref(false);
  const error = ref<string | null>(null);

  const encrypt = async (value: number | bigint): Promise<EncryptedValue> => {
    if (!isInitialized.value) {
      throw new Error('FHEVM client is not initialized yet. Please wait for initialization to complete.');
    }

    if (isEncrypting.value) {
      throw new Error('An encryption operation is already in progress. Please wait for it to complete.');
    }

    isEncrypting.value = true;
    error.value = null;

    try {
      const encrypted = await client.encrypt(value);
      return encrypted;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Encryption failed';
      error.value = errorMessage;
      throw new Error(errorMessage);
    } finally {
      isEncrypting.value = false;
    }
  };

  const resetError = () => {
    error.value = null;
  };

  return {
    encrypt,
    isEncrypting: readonly(isEncrypting),
    error: readonly(error),
    resetError,
  };
}
