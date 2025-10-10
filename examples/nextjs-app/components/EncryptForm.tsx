'use client';

import { useState } from 'react';
import { useEncrypt } from '@fhevm/sdk/react';
import type { EncryptedValue } from '@fhevm/sdk/types';

interface EncryptFormProps {
  onEncrypted: (value: EncryptedValue) => void;
}

export default function EncryptForm({ onEncrypted }: EncryptFormProps) {
  const [inputValue, setInputValue] = useState<string>('');
  const [error, setError] = useState<string>('');
  const { encrypt, isEncrypting, error: encryptError } = useEncrypt();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate input
    const numValue = parseInt(inputValue, 10);
    if (isNaN(numValue)) {
      setError('Please enter a valid number');
      return;
    }

    if (numValue < 0) {
      setError('Please enter a positive number');
      return;
    }

    try {
      // Encrypt the value
      const encrypted = await encrypt(numValue);
      onEncrypted(encrypted);

      // Clear form on success
      setInputValue('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Encryption failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="value" className="block text-sm font-medium text-gray-700 mb-2">
          Value to Encrypt
        </label>
        <input
          type="number"
          id="value"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter a number (e.g., 42)"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={isEncrypting}
        />
      </div>

      {(error || encryptError) && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">{error || encryptError}</span>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={isEncrypting || !inputValue}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        {isEncrypting ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Encrypting...
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Encrypt Value
          </>
        )}
      </button>

      <div className="text-xs text-gray-500 space-y-1">
        <p>How it works:</p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>Value is encrypted using FHE on the client side</li>
          <li>Encrypted data is signed with your wallet (EIP-712)</li>
          <li>Can be used in smart contracts without decryption</li>
        </ul>
      </div>
    </form>
  );
}
