/**
 * React hook for FHE encryption
 */

import { useState, useCallback } from 'react';
import { useFHEVM } from './useFHEVM';
import type { EncryptedValue, EncryptionOptions } from '../types';

export interface UseEncryptResult {
  /** Encrypt a value */
  encrypt: (value: number | bigint, options?: EncryptionOptions) => Promise<EncryptedValue>;

  /** Whether encryption is in progress */
  isEncrypting: boolean;

  /** Encryption error if any */
  error: Error | null;

  /** Reset error state */
  resetError: () => void;
}

export function useEncrypt(): UseEncryptResult {
  const { client, isInitialized } = useFHEVM();
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const encrypt = useCallback(
    async (value: number | bigint, options?: EncryptionOptions): Promise<EncryptedValue> => {
      if (!isInitialized || !client) {
        throw new Error('FHEVM client not initialized');
      }

      setIsEncrypting(true);
      setError(null);

      try {
        const encrypted = await client.encrypt(value);
        return encrypted;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Encryption failed');
        setError(error);
        throw error;
      } finally {
        setIsEncrypting(false);
      }
    },
    [client, isInitialized]
  );

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  return {
    encrypt,
    isEncrypting,
    error,
    resetError
  };
}
