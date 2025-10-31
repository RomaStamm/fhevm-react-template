/**
 * Encryption Hook
 * Enhanced encryption hook with additional functionality
 */

'use client';

import { useState, useCallback } from 'react';
import { useEncrypt } from '@fhevm/sdk/react';
import { validateEncryptionValue } from '@/lib/utils/validation';

export function useEncryption() {
  const { encrypt, isInitialized } = useEncrypt();
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [encryptedValue, setEncryptedValue] = useState<any>(null);

  const encryptValue = useCallback(async (value: number) => {
    setError(null);
    setIsEncrypting(true);

    try {
      // Validate input
      const validation = validateEncryptionValue(value);
      if (!validation.valid) {
        throw new Error(validation.error);
      }

      // Encrypt
      const encrypted = await encrypt(value);
      setEncryptedValue(encrypted);

      return encrypted;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Encryption failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsEncrypting(false);
    }
  }, [encrypt]);

  const reset = useCallback(() => {
    setEncryptedValue(null);
    setError(null);
    setIsEncrypting(false);
  }, []);

  return {
    encrypt: encryptValue,
    isEncrypting,
    error,
    encryptedValue,
    isInitialized,
    reset
  };
}
